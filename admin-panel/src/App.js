import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

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
    formDataa.append("file", file);
    try {
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

      console.log(responseData.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>ADMIN DASHBOARD</h2>

      <h3>UPLOAD A PRODUCT</h3>

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
