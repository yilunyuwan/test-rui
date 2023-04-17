import React, { ChangeEventHandler } from "react";
import axios from "axios";

function App() {
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          console.log(resp);
        });
    }
  };
  return (
    <div className="App">
      {/*<form method="post" encType="multipart/form-data" action="https://jsonplaceholder.typicode.com/posts">*/}
      {/*  <input type="file" name="myFile"/>*/}
      {/*  <button type="submit">Submit</button>*/}
      {/*</form>*/}
      <input type="file" name="myFile" onChange={handleFileChange} />
    </div>
  );
}

export default App;
