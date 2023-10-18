import React, { useEffect, useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Directory() {
  const history = useHistory();
  const [userdata, setuserdata] = useState([]);
  useEffect(() => {
    getusers();
  }, []);

  const getusers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        getposts(res.data);
      })
      .catch((err) => {});
  };

  const getposts = (userapidata) => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        var postdata = res.data;
        for (var i = 0; i < userapidata.length; i++) {
          const filterBySearch = postdata.filter((item) => {
            if (item.userId == userapidata[i].id) {
              return item;
            }
          });
          userapidata[i].Post = filterBySearch;
        }
        setuserdata(userapidata);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <h1 className="heading">Directory</h1>
      {userdata.map((item) => (
        <div
          className="usercard"
          key={item.id}
          onClick={() => history.push( {pathname:  `/user/${item.id}`,state:item } )}
        >
          <p> Name: {item.name}</p>
          <p> Posts: {item.Post.length}</p>
        </div>
      ))}
    </div>
  );
}
