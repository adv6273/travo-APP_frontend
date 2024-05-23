import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../Urls";
export default function AddNewPlace() {
  const [title, settitle] = useState("");
  const [address, setaddress] = useState("");
  const [description, setdescription] = useState(" ");
  const [addedphotos, setaddedphotos] = useState([]);
  const [photolink, setphotolink] = useState("");
  const [perks, setperks] = useState([]);
  const [extrainfo, setextrainfo] = useState(" ");
  const [checkin, setcheckin] = useState();
  const [checkout, setcheckout] = useState();
  const [maxguest, setmaxguest] = useState();
  const [price, setprice] = useState();
  const {id}=useParams();
  const handleCheckboxChange = (e) => {
    const perkValue = e.target.value;
    if (e.target.checked) {
      // If the checkbox is checked, add the value to the perks array
      setperks([...perks, perkValue]);
    } else {
      // If the checkbox is unchecked, remove the value from the perks array
      setperks(perks.filter((perk) => perk !== perkValue));
    }
  };

  async function addphotobylink(event) {
    event.preventDefault();

    const { data: filename } = await axios.post(
      `${baseUrl}/upload-by-link`,
      {
        link: photolink,
      }
    );
    console.log(filename);
    if (filename === "invalid link") {
      alert(
        "please add valid link first \n  (Hint : link should start with http://)"
      );
      setphotolink("");
      return;
    }
    setaddedphotos((prev) => {
      return [...prev, filename];
    });
    setphotolink("");
  }

  const [redirecttomyAccommodation, setredirecttomyAccommodation] =
    useState(false);
  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    // Send formData to your server or perform other actions
    // console.log(formData);
    if (
      title === "" ||
      address === "" ||
      description === "" ||
      checkin === "" ||
      checkout === "" ||
      maxguest === "" ||
      price === ""
    ) {
      alert("fill required dields ");
      return;
    }
    try{
      console.log(addedphotos);
      const response = await axios.post(`${baseUrl}/addingplace`, {
        title,
        address,
        description,
        addedphotos,
        perks,
        extrainfo,
        checkin,
        checkout,
        maxguest,
        price,
      });
      console.log(response);
      setredirecttomyAccommodation(true);
        alert("added successfully")
    }
    catch(err)
    {

      alert("not added place due to error",err);
      console.log("not added place due to error " ,err)
    }
    
    
    
    
    
    
  };

  useEffect(()=>{
      if(!id) return;
      // axios.get('http://localhost:4000/acounts/myAccommodation/new/'+ id).then(response=>{
      axios.get(`${baseUrl}/places/`+ id).then(response=>{
      // axios.get('/addingplace/'+ id).then(response=>{
        const {data}= response;
        settitle(data.title);

      })
  },[id])

  if (redirecttomyAccommodation) {
    console.log("wwent into redirecttomyAccommodation")
    return <Navigate to={"/acounts/myAccommodation/"} />;
  }

  function addphoto(ev) {
    const files = ev.target.files;
    const data = new FormData();

    // Array.from(files).forEach((file) => {
    // });
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post(`${baseUrl}/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        // console.log(filenames);
        setaddedphotos((prev) => [...prev, ...filenames]);
      })
      .catch((error) => {
        console.error("Error uploading photos:", error);
      });
  }

  return (
    <form className="max-w-screen-sm mx-auto mt-4 px-4">
      <div className="text-2xl mb-4">
        <label htmlFor="title" className="block mb-2">
          Title:
          {/* <span className="text-sm" style={{color:"red"}} ></span>  */}
          <p className="text-sm" style={{ color: "red" }}>
            (required)
          </p>
        </label>
        <input
          id="title"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="text"
          name="title"
          placeholder="Enter your attractive place title to get attention of people"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          required
        />
      </div>
      <div className="text-2xl mb-4">
        <label htmlFor="address" className="block mb-2">
          Address:
          <p className="text-sm" style={{ color: "red" }}>
            (required)
          </p>
        </label>
        <input
          id="address"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="text"
          name="address"
          placeholder="Enter your place address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          required
        />
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="photos" className="block mb-2">
          Photos:
          <p className="text-sm" style={{ color: "red" }}>
            (required)
          </p>
        </label>
        <div className="flex items-center">
          <textarea
            id="photos"
            className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
            type="photos"
            name="photos"
            placeholder="Add your photos link here"
            value={photolink}
            onChange={(e) => setphotolink(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4  text-dark text-sm rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
            type="submit"
            onClick={addphotobylink}
          >
            Add Photo
          </button>
        </div>

        <div className="mt-2 flex grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {addedphotos.length > 0 &&
            addedphotos.map((link) => (
              <div className="flex" key={link}>
                {/* {link} */}

                <img
                  className=" rounded-2xl w-full  w-40 h-40 mt-2 mr-2 ml-2 border border-gray-300 rounded-2xl"
                  src={`${baseUrl}/uploads/` + link}
                  alt={link}
                ></img>
              </div>
            ))}
        </div>

        <div className="mt-2 flex cursor-pointer ">
          <label className=" h-32 flex border border-transparent cursor-pointer rounded-2xl p-6 ml-2 ">
            <input
              type="file"
              multiple
              className="hidden "
              onChange={addphoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 mr-2  mb-1  text-center h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload from Your Device
          </label>
        </div>
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="description" className="block mb-2">
          Description:
          <p className="text-sm" style={{ color: "red" }}>
            (required)
          </p>
        </label>

        <textarea
          id="description"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700 h-32"
          name="description"
          placeholder="Enter your place description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        >
          {/* Style the placeholder text */}
          <style>
            {`
      ::placeholder {
        text-align: left;
        padding-left: 10px; /* Adjust the padding as needed */
      }
    `}
          </style>
        </textarea>
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="extrainfo" className="block mb-2">
          Extra Information:
        </label>
        <textarea
          id="extrainfo"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="text"
          name="extrainfo"
          placeholder="Write extra information about your place"
          value={extrainfo}
          onChange={(e) => setextrainfo(e.target.value)}
        >
          <style>
            {`
      ::placeholder {
        text-align: left;
        padding-left: 10px; /* Adjust the padding as needed */
      }
    `}
          </style>
        </textarea>
      </div>

      <h1 className="mb-2 text-2xl"> Perks: </h1>
      <div className="flex flex-wrap  ">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-3  border border p-2 items-center mr-3   flex rounded-2xl gap-2    ">
          <label className="block mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink" // Fix the xmlns:xlink attribute name
              height="30px"
              width="30px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 296.999 296.999"
              xmlSpace="preserve"
              className="mr-2"
            >
              <g id="XMLID_42_">
                <g>
                  <path d="M20.068,254.355h256.865v-52.738c-21.673-0.602-33.653-6.04-44.279-10.877c-10.786-4.896-20.098-9.131-39.995-9.131    c-19.907,0-29.218,4.234-40.005,9.131c-11.268,5.127-24.051,10.937-48.303,10.937c-24.242,0-37.025-5.81-48.293-10.937    c-10.034-4.555-18.793-8.539-35.991-9.071v72.686H20.068z M92.311,138.465h79.267v-29.6H92.311V138.465z M104.351,181.61    c19.907,0,29.218-4.234,40.005-9.131c7.455-3.391,15.572-7.084,27.222-9.191v-4.756H92.311v22.466    C95.883,181.389,99.846,181.61,104.351,181.61z M171.578,88.797V65.72c0-23.79,19.355-43.145,43.145-43.145    s43.145,19.355,43.145,43.145c0,5.539-4.485,10.034-10.034,10.034c-5.539,0-10.034-4.495-10.034-10.034    c0-12.723-10.345-23.078-23.078-23.078c-12.723,0-23.078,10.355-23.078,23.078v95.833c0.341,0,0.672-0.01,1.013-0.01    c24.242,0,37.025,5.81,48.293,10.937c10.034,4.555,18.793,8.539,35.981,9.071v-66.163c0-5.539,4.495-10.034,10.034-10.034    c5.549,0,10.034,4.495,10.034,10.034V264.39c0,5.539-4.485,10.034-10.034,10.034H10.034C4.495,274.424,0,269.929,0,264.39V115.387    c0-5.539,4.495-10.034,10.034-10.034c5.549,0,10.034,4.495,10.034,10.034v46.216c21.683,0.602,33.653,6.04,44.289,10.877    c2.659,1.204,5.228,2.368,7.887,3.442V65.72c0-23.79,19.355-43.145,43.145-43.145s43.145,19.355,43.145,43.145    c0,5.539-4.485,10.034-10.034,10.034c-5.539,0-10.034-4.495-10.034-10.034c0-12.723-10.345-23.078-23.078-23.078    c-12.723,0-23.078,10.355-23.078,23.078v23.078L171.578,88.797L171.578,88.797z" />
                  <path
                    style={{ fill: "#67F0FF" }}
                    d="M20.068,254.355V181.67c17.198,0.532,25.957,4.515,35.991,9.071    c11.268,5.127,24.051,10.937,48.293,10.937c24.252,0,37.035-5.81,48.303-10.937c10.786-4.896,20.098-9.131,40.005-9.131    c19.897,0,29.208,4.234,39.995,9.131c10.626,4.836,22.606,10.275,44.279,10.877v52.738H20.068V254.355z"
                  />
                </g>
              </g>
            </svg>
            Swimming Pool{" "}
            <input
              type="checkbox"
              name="perks"
              value="swimmingPool"
              checked={perks.includes("swimmingPool")}
              onChange={handleCheckboxChange}
              className="ml-2  "
            />
          </label>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-3 border border p-2 items-center mr-3   flex rounded-2xl gap-2  ">
          <label className="block mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              />
            </svg>
            Wifi
            <input
              type="checkbox"
              name="perks"
              value="wifi"
              checked={perks.includes("wifi")}
              onChange={handleCheckboxChange}
              className="mr-2 ml-2"
            />
          </label>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-3 border border p-2 items-center mr-3   flex rounded-2xl gap-2  ">
          <label className="block mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="mr-2"
            >
              <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
            </svg>
            Pet-friendly
            <input
              type="checkbox"
              name="perks"
              value="pet"
              checked={perks.includes("pet")}
              onChange={handleCheckboxChange}
              className="mr-2 ml-2"
            />
          </label>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-3 border border p-2 items-center mr-3   flex rounded-2xl gap-2  ">
          <label className="block mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              className="mr-2"
            >
              <path d="M240 144A96 96 0 1 0 48 144a96 96 0 1 0 192 0zm44.4 32C269.9 240.1 212.5 288 144 288C64.5 288 0 223.5 0 144S64.5 0 144 0c68.5 0 125.9 47.9 140.4 112h71.8c8.8-9.8 21.6-16 35.8-16H496c26.5 0 48 21.5 48 48s-21.5 48-48 48H392c-14.2 0-27-6.2-35.8-16H284.4zM144 80a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM400 240c13.3 0 24 10.7 24 24v8h96c13.3 0 24 10.7 24 24s-10.7 24-24 24H280c-13.3 0-24-10.7-24-24s10.7-24 24-24h96v-8c0-13.3 10.7-24 24-24zM288 464V352H512V464c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48zM48 320h80 16 32c26.5 0 48 21.5 48 48s-21.5 48-48 48H160c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V336c0-8.8 7.2-16 16-16zm128 64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160v32h16zM24 464H200c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
            </svg>
            Kitchen
            <input
              type="checkbox"
              name="perks"
              value="kitchen"
              checked={perks.includes("kitchen")}
              onChange={handleCheckboxChange}
              className="mr-2 ml-2 mb-3 mt-3"
            />{" "}
          </label>
        </div>

        {/* 
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-3">

      <label className="block mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"
        className="mr-2"
        ><path d="M64 64V352H576V64H64zM0 64C0 28.7 28.7 0 64 0H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM128 448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
        TV
          <input
            type="checkbox"
            name="perks"
            value="tv"
            checked={perks.includes("tv")}
            onChange={handleCheckboxChange}
            className="mr-2 ml-6 mb-3 mt-3"
          />{" "}
          
        </label>

        </div> */}

        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 mb-3 border border p-2 items-center mr-3   flex rounded-2xl gap-2  ">
          <label className="block mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
              className="mr-2"
            >
              <path d="M246.9 14.1C234 15.2 224 26 224 39c0 13.8 11.2 25 25 25H400c8.8 0 16-7.2 16-16V17.4C416 8 408 .7 398.7 1.4L246.9 14.1zM240 112c0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H241.6c-1 5.2-1.6 10.5-1.6 16zM72 224c-22.1 0-40 17.9-40 40s17.9 40 40 40H224v89.4L386.8 230.5c-13.3-4.3-27.3-6.5-41.6-6.5H240 72zm345.7 20.9L246.6 416H416V369.7l53.6 90.6c11.2 19 35.8 25.3 54.8 14.1s25.3-35.8 14.1-54.8L462.3 290.8c-11.2-18.9-26.6-34.5-44.6-45.9zM224 448v32c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V448H224z" />
            </svg>
            Security
            <input
              type="checkbox"
              name="perks"
              value="security"
              checked={perks.includes("security")}
              onChange={handleCheckboxChange}
              className="mr-2 ml-2 mb-3 mt-3"
            />{" "}
          </label>
        </div>

        {/* Repeat the same structure for other checkboxes */}
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="checkin" className="block mb-2">
          Check-In time:
          <p className="text-sm" style={{ color: "red" }}>
            (required)
          </p>
        </label>
        <input
          id="checkin"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="number"
          name="checkin"
          placeholder="0700"
          value={checkin}
          required
          onChange={(e) => setcheckin(e.target.value)}
          // required minLength={3}
        />
      </div>
      <div className="text-2xl mb-4">
        <label htmlFor="checkout" className="block mb-2">
          Check-Out time:
          <p className="text-sm" style={{ color: "red" }}>
            (required)
          </p>
        </label>
        <input
          id="checkout"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="number"
          name="checkout"
          placeholder="2300"
          value={checkout}
          onChange={(e) => setcheckout(e.target.value)}
          required
        />
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="maxguest" className="block mb-2">
          Maximum number of Guests:
        </label>
        <input
          id="maxguest"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="number"
          name="maxguest"
          placeholder="Enter the maximum number of guests allowed"
          value={maxguest}
          onChange={(e) => setmaxguest(e.target.value)}
          required
        />
      </div>
      <div className="text-2xl mb-4">
        <label htmlFor="price" className="block mb-2">
          Price/day (in USD)
          <p className="text-sm" style={{ color: "red" }}>
            (required)
          </p>
        </label>
        <input
          id="price"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="number"
          name="price"
          placeholder="Enter the price of your place per night in standered USD"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          required
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-primary mb-2 py-2 px-4 text-white font-semibold rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
