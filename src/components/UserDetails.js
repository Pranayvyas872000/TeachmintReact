import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import Popup from "./Popup";
var Pause = false;
var Timeobject = null;
var Timeobject2 = null;
export default function UserDetails() {
  const [userdata, setuserdata] = useState({});
  const [countrydata, setcountrydata] = useState([]);
  const [countryvalue, setcountryvalue] = useState("");
  const [countrytime, setTime] = useState("00:00:00");
  const [localtime, setlocaltime] = useState("00:00:00");
  const [visibility, setVisibility] = useState(false);
  const [popupheading, setpopupheading] = useState("");
  const [popupcontent, setpopupcontent] = useState("");

  const popupCloseHandler = () => {
    setVisibility(false);
  };
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    setuserdata(location.state);
    getcountry();
    clearInterval(Timeobject2);
    const d = new Date();
    Timeobject2 = setInterval(function () {
      if (Pause == false) {
        d.setSeconds(d.getSeconds() + 1);
        setlocaltime(
          d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        );
      }
    }, 1000);
  }, []);

  const getcountry = () => {
    axios
      .get("http://worldtimeapi.org/api/timezone")
      .then((res) => {
        setcountrydata(res.data);
      })
      .catch((err) => {});
  };

  const handlechange = (e) => {
    var value = e.target.value;
    setcountryvalue(value);
    axios
      .get(`http://worldtimeapi.org/api/timezone/${value}`)
      .then((res) => {
        let Timestamp = res.data.datetime;

        var d;
        d = new Date(Timestamp.slice(0, 19));
        Pause = false;
        clearInterval(Timeobject);
        Timeobject = setInterval(function () {
          if (Pause == false) {
            d.setSeconds(d.getSeconds() + 1);
            setTime(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
          }
        }, 1000);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const Pausetimer = () => {
    Pause = !Pause;
  };

  return (
    <div>
      <div className="countrycard">
        <div>
          <button className="backbtn" onClick={() => history.push("/")}>
            Back
          </button>
        </div>

        <div className="countrycardcol">
          <select
            className="dropdown"
            onChange={handlechange}
            value={countryvalue}
          >
            <option value="" disabled>
              Select Country
            </option>
            {countrydata.map((item) => (
              <option value={item}  key={item}>{item}</option>
            ))}
          </select>

          {countryvalue != "" ? (
            <span className="timer">{countrytime}</span>
          ) : (
            <span className="timer">{localtime}</span>
          )}

          <button className="pausebtn" onClick={() => Pausetimer()}>
            Pause/Resume
          </button>
        </div>
      </div>

<h1 className="heading">Profile Page</h1>

      {Object.keys(userdata).length > 0 ? (
        <>
          <div className="profilecard">
            <div>
              <p>
                {userdata.name}
                <br />
                {userdata.username} | {userdata.company.catchPhrase}
              </p>
            </div>
            <div>
              <p>
                {userdata.address.suite} {userdata.address.street}
                {userdata.address.city} {userdata.address.zipcode}
                <br />
                {userdata.email} | {userdata.phone}
              </p>
            </div>
          </div>

          <div className="postcardrow">
            {userdata.Post?.map((item) => (
              <div className="postcardcol" key={item.id}>
                <div
                  className="postcard"
                  onClick={() => {
                    setVisibility(true);
                    setpopupheading(item.title);
                    setpopupcontent(item.body);
                  }}
                >
                  <h1> {item.title}</h1>
                  <p> {item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <Popup onClose={popupCloseHandler} show={visibility}>
        <h1>{popupheading}</h1>
        <p>{popupcontent}</p>
      </Popup>
    </div>
  );
}
