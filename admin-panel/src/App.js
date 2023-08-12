import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const[description ,setDescription] =useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const[isLoading ,setIsLoading] = useState(false);
  const[responseMsg ,setResponseMsg] =useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleDescription=(e)=>{
    setDescription(e.target.value);
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  const handleSubmit = async () => {
    const formDataa = new FormData();
    formDataa.append("title", title);
    formDataa.append("price", price);
    formDataa.append("description" , description);
    formDataa.append("file", file);
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/products/admin/postkrdead`,
        {
          method: "POST",

          body: formDataa,
        },
      );

      const responseData = await response.json();

      if (response.status !== 201) {
        throw new Error(responseData.message);
      }
         setIsLoading(false);
      setResponseMsg(responseData.message);
    } catch (error) {
      setResponseMsg(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>ADMIN DASHBOARD</h2>

      <h3>UPLOAD A PRODUCT</h3>

{isLoading? <p>Adding new product...</p> : null}
{
  responseMsg!=="" ? <p>{responseMsg}</p> : null
}
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={handleTitle}
      />
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={handlePrice}
      />
        <input
        type="text"
        placeholder="description"
        value={description}
        onChange={handleDescription}
      />

      <input
        type="file"
        placeholder="upload an image"
        accept=".jpg , .png , .jpeg"
        onChange={handleFile}
      />

      {previewUrl !== "" && (
        <img
          src={previewUrl}
          width={100}
          height={100}
          style={{ marginTop: "50px" }}
        />
      )}

      <button style={{ marginTop: "30px" }} onClick={handleSubmit}>
        {" "}
        Add Product{" "}
      </button>
    </div>
  );
}

export default App;
