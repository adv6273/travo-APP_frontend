import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from '../Urls';
const EditForm = () => {
  const [mdata, setMData] = useState(null);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [photolink, setPhotolink] = useState('');
  const [addedphotos, setAddedphotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extrainfo, setExtrainfo] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [maxguest, setMaxguest] = useState('');
  const [price, setPrice] = useState('');
  const [redirectToMyAccommodation, setRedirectToMyAccommodation] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/places/${id}`, {
          method: 'GET',
        });

        const data = await response.json();
        setMData(data);
      } catch (err) {
        console.log(err.toString());
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (mdata) {
      setTitle(mdata.title || '');
      setAddress(mdata.address || '');
      setDescription(mdata.description || '');
      setPhotolink(mdata.photolink || '');
      setAddedphotos(mdata.photos || []);
      setPerks(mdata.perks || []);
      setExtrainfo(mdata.extrainfo || '');
      setCheckin(mdata.checkin || '');
      setCheckout(mdata.checkout || '');
      setMaxguest(mdata.maxguest || '');
      setPrice(mdata.price || '');
    }
  }, [mdata]);

  const handleCheckboxChange = (e) => {
    const perkValue = e.target.value;
    if (e.target.checked) {
      setPerks([...perks, perkValue]);
    } else {
      setPerks(perks.filter((perk) => perk !== perkValue));
    }
  };

  const addPhotobyLink = async (event) => {
    event.preventDefault();

    const { data: filename } = await axios.post(
      `${baseUrl}/upload-by-link`,
      {
        link: photolink,
      }
    );

    if (filename === "invalid link") {
      alert("Please add a valid link first (Hint: link should start with http://)");
      setPhotolink("");
      return;
    }

    setAddedphotos((prev) => [...prev, filename]);
    setPhotolink("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/profile-update/${id}`, {
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
      // console.log(response);
      setRedirectToMyAccommodation(true);
      alert('Updated successfully');
    } catch (err) {
      console.error('Error updating place:', err);
      alert('Failed to update place. Check the console for more details.');
    }
  };

  const handleDelete = async () => {
    const firstConfirmation = window.confirm("Are you sure you want to delete this place?");
    if (!firstConfirmation) {
      return;
    }

    const secondConfirmation = window.confirm("This action is irreversible. Are you absolutely sure you want to delete this place?");
    if (!secondConfirmation) {
      return;
    }

    try {
      const response = await axios.delete(`${baseUrl}0/places/${id}`, {
        withCredentials: true,
      });
      alert(response.data.message || 'Place deleted successfully');
      navigate('/acounts/myAccommodation');
    } catch (err) {
      alert('Error deleting place: ' + err);
    }
  };

  if (redirectToMyAccommodation) {
    return <Navigate to={"/acounts/myAccommodation/"} />;
  }

  const addPhoto = (ev) => {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
      // setAddedphotos(....,files[i] );
    }

    axios.post(`${baseUrl}/upload`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      const { data: filenames } = response;
      setAddedphotos((prev) => [...prev, ...filenames]);
    }).catch((error) => {
      console.error("Error uploading photos:", error);
    });
  };
  const deletePhoto = (photo) => {
    setAddedphotos((prev) => prev.filter((p) => p !== photo));
  };

//  const addPhoto = (ev) => {
//     const files = Array.from(ev.target.files);
//     setAddedphotos((prevPhotos) => [...prevPhotos, ...files]);
//   };
  return (
    <form className="max-w-screen-sm mx-auto mt-4 px-4" onSubmit={handleSubmit}>
      <div className="text-2xl mb-4">
        <label htmlFor="title" className="block mb-2">
          Title:
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
          onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setAddress(e.target.value)}
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
            name="photos"
            placeholder="Add your photos link here"
            value={photolink}
            onChange={(e) => setPhotolink(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4 text-dark text-sm rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
            type="button"
            onClick={addPhotobyLink}
          >
            Add Photo
          </button>
        </div>

        <div className="mt-2 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {addedphotos.length > 0 &&
            addedphotos.map((link, index) => (
              <div className="flex" key={index}>
                <img
                  className="rounded-2xl w-full w-40 h-40 mt-2 mr-2 ml-2 border border-gray-300"
                  src={`${baseUrl}/uploads/` + link}
                  alt={link}
                />
                 <button
                  type="button"
                  className="absolute  p-1 bg-red-500 text-white rounded-full"
                  onClick={() => deletePhoto(link)}
                >
                  X
                </button>
              </div>
            ))}
        </div>

        <div className="mt-2 flex cursor-pointer">
          <label className="h-32 flex border border-transparent cursor-pointer rounded-2xl p-6 ml-2">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={addPhoto}
            />
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2 mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload from device
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
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          name="description"
          placeholder="Give detail description of your place to make it attractive"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="perks" className="block mb-2">
          Perks:
          <p className="text-sm" style={{ color: "red" }}>
            (required)
          </p>
        </label>
        <div className="gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
          {['wifi', 'parking', 'tv', 'radio', 'pets', 'entrance'].map((perk, index) => (
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer" key={index}>
              <input
                type="checkbox"
                name="perks"
                value={perk}
                checked={perks.includes(perk)}
                onChange={handleCheckboxChange}
              />
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Define icons for each perk */}
                {perk === 'wifi' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.05 12.1a9 9 0 0113.9 0m-1.45 1.45a6 6 0 00-10.9 0M12 20.25V21m0-2a4 4 0 110-8 4 4 0 010 8z" />
                )}
                {perk === 'parking' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21v-4m8 4v-4M7 7h10v7a2 2 0 01-2 2H9a2 2 0 01-2-2V7zM7 7V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7H5a2 2 0 00-2 2v10a2 2 0 002 2h2M17 7h2a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                )}
                {perk === 'tv' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 13.5h19.5M8.25 6v.75H5.25v7.5H8.25V12h3v2.25h3v-.75h3v-4.5h-3v-.75H8.25v-.75h-3v2.25" />
                )}
                {perk === 'radio' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6.75v1.5M8.25 6.75v1.5M7.5 9.75H16.5a.75.75 0 01.75.75V15a.75.75 0 01-.75.75H7.5A.75.75 0 016.75 15V10.5a.75.75 0 01.75-.75zM12 14.25v.75" />
                )}
                {perk === 'pets' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.25 14.25a3 3 0 11-3-3 3 3 0 013 3zM11.25 17.25a3 3 0 11-3 3 3 3 0 013-3zM12.75 14.25a3 3 0 113-3 3 3 0 01-3 3zM15.75 17.25a3 3 0 113-3 3 3 0 01-3 3zM16.5 12v3.75M14.25 10.5h1.5M10.5 14.25h3" />
                )}
                {perk === 'entrance' && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3.75v1.5m0 1.5v1.5m0-6.75V5.25m0 0a1.125 1.125 0 011.125 1.125H10.875A1.125 1.125 0 0112 5.25zM12 21V12.75m0-1.5h.75M12 12.75h-.75M7.5 16.5v-6.75m9 6.75v-6.75M4.5 19.5h15m-1.125 1.125v.375A2.625 2.625 0 0115.75 21H8.25a2.625 2.625 0 01-2.625-2.625v-.375" />
                )}
              </svg>
              <span className="text-sm capitalize">{perk}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="extrainfo" className="block mb-2">
          Extra Info:
        </label>
        <textarea
          id="extrainfo"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          name="extrainfo"
          placeholder="Add additional information"
          value={extrainfo}
          onChange={(e) => setExtrainfo(e.target.value)}
        />
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="checkin" className="block mb-2">
          Check-in Time:
        </label>
        <input
          id="checkin"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="text"
          name="checkin"
          placeholder="Enter check-in time"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
        />
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="checkout" className="block mb-2">
          Check-out Time:
        </label>
        <input
          id="checkout"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="text"
          name="checkout"
          placeholder="Enter check-out time"
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
        />
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="maxguest" className="block mb-2">
          Max Guests:
        </label>
        <input
          id="maxguest"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="number"
          name="maxguest"
          placeholder="Enter the maximum number of guests"
          value={maxguest}
          onChange={(e) => setMaxguest(e.target.value)}
        />
      </div>

      <div className="text-2xl mb-4">
        <label htmlFor="price" className="block mb-2">
          Price per Night:
        </label>
        <input
          id="price"
          className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
          type="number"
          name="price"
          placeholder="Enter the price per night"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="text-center">
        <button
          className="bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
          type="submit"
        >
          Update Place
        </button>
      </div>

      <div className="text-center mt-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
          type="button"
          onClick={() => {
            // handle delete action
          }}
        >
          Delete Place
        </button>
      </div>
    </form>
  );
};

export default EditForm;



// import React, { useEffect, useState } from "react";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditForm = () => {
//   const [mdata, setMData] = useState(null);
//   const [title, setTitle] = useState('');
//   const [address, setAddress] = useState('');
//   const [description, setDescription] = useState('');
//   const [photolink, setPhotolink] = useState('');
//   const [addedphotos, setAddedphotos] = useState([]);
//   const [perks, setPerks] = useState([]);
//   const [extrainfo, setExtrainfo] = useState('');
//   const [checkin, setCheckin] = useState('');
//   const [checkout, setCheckout] = useState('');
//   const [maxguest, setMaxguest] = useState('');
//   const [price, setPrice] = useState('');
//   const [redirectToMyAccommodation, setRedirectToMyAccommodation] = useState(false);
  
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/places/${id}`, {
//           method: 'GET',
//         });

//         const data = await response.json();
//         setMData(data);
//       } catch (err) {
//         console.log(err.toString());
//       }
//     };

//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     if (mdata) {
//       setTitle(mdata.title || '');
//       setAddress(mdata.address || '');
//       setDescription(mdata.description || '');
//       setPhotolink(mdata.photolink || '');
//       setAddedphotos(mdata.photos || []);
//       setPerks(mdata.perks || []);
//       setExtrainfo(mdata.extrainfo || '');
//       setCheckin(mdata.checkin || '');
//       setCheckout(mdata.checkout || '');
//       setMaxguest(mdata.maxguest || '');
//       setPrice(mdata.price || '');
//     }
//   }, [mdata]);

//   const handleCheckboxChange = (e) => {
//     const perkValue = e.target.value;
//     if (e.target.checked) {
//       setPerks([...perks, perkValue]);
//     } else {
//       setPerks(perks.filter((perk) => perk !== perkValue));
//     }
//   };

//   const addPhotobyLink = async (event) => {
//     event.preventDefault();

//     const { data: filename } = await axios.post(
//       "http://localhost:4000/upload-by-link",
//       {
//         link: photolink,
//       }
//     );

//     if (filename === "invalid link") {
//       alert("Please add a valid link first (Hint: link should start with http://)");
//       setPhotolink("");
//       return;
//     }

//     setAddedphotos((prev) => [...prev, filename]);
//     setPhotolink("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`http://localhost:4000/profile-update/${id}`, {
//         title,
//         address,
//         description,
//         addedphotos,
//         perks,
//         extrainfo,
//         checkin,
//         checkout,
//         maxguest,
//         price,
//       });
//       setRedirectToMyAccommodation(true);
//       alert('Updated successfully');
//     } catch (err) {
//       console.error('Error updating place:', err);
//       alert('Failed to update place. Check the console for more details.');
//     }
//   };

//   const handleDelete = async () => {
//     const firstConfirmation = window.confirm("Are you sure you want to delete this place?");
//     if (!firstConfirmation) {
//       return;
//     }

//     const secondConfirmation = window.confirm("This action is irreversible. Are you absolutely sure you want to delete this place?");
//     if (!secondConfirmation) {
//       return;
//     }

//     try {
//       const response = await axios.delete(`http://localhost:4000/places/${id}`, {
//         withCredentials: true,
//       });
//       alert(response.data.message || 'Place deleted successfully');
//       navigate('/acounts/myAccommodation');
//     } catch (err) {
//       alert('Error deleting place: ' + err);
//     }
//   };

//   if (redirectToMyAccommodation) {
//     return <Navigate to={"/acounts/myAccommodation/"} />;
//   }

//   const addPhoto = (ev) => {
//     const files = ev.target.files;
//     const data = new FormData();

//     for (let i = 0; i < files.length; i++) {
//       data.append("photos", files[i]);
//     }

//     axios.post("http://localhost:4000/upload", data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     }).then((response) => {
//       const { data: filenames } = response;
//       setAddedphotos((prev) => [...prev, ...filenames]);
//     }).catch((error) => {
//       console.error("Error uploading photos:", error);
//     });
//   };

//   const deletePhoto = (photo) => {
//     setAddedphotos((prev) => prev.filter((p) => p !== photo));
//   };

//   return (
//     <form className="max-w-screen-sm mx-auto mt-4 px-4" onSubmit={handleSubmit}>
//       <div className="text-2xl mb-4">
//         <label htmlFor="title" className="block mb-2">
//           Title:
//           <p className="text-sm" style={{ color: "red" }}>
//             (required)
//           </p>
//         </label>
//         <input
//           id="title"
//           className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//           type="text"
//           name="title"
//           placeholder="Enter your attractive place title to get attention of people"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>

//       <div className="text-2xl mb-4">
//         <label htmlFor="address" className="block mb-2">
//           Address:
//           <p className="text-sm" style={{ color: "red" }}>
//             (required)
//           </p>
//         </label>
//         <input
//           id="address"
//           className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//           type="text"
//           name="address"
//           placeholder="Enter your place address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//         />
//       </div>

//       <div className="text-2xl mb-4">
//         <label htmlFor="photos" className="block mb-2">
//           Photos:
//           <p className="text-sm" style={{ color: "red" }}>
//             (required)
//           </p>
//         </label>
//         <div className="flex items-center">
//           <textarea
//             id="photos"
//             className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//             name="photos"
//             placeholder="Add your photos link here"
//             value={photolink}
//             onChange={(e) => setPhotolink(e.target.value)}
//           />
//           <button
//             className="bg-primary text-white px-4 text-dark text-sm rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
//             type="button"
//             onClick={addPhotobyLink}
//           >
//             Add Photo
//           </button>
//         </div>

//         <div className="mt-2 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {addedphotos.length > 0 &&
//             addedphotos.map((link, index) => (
//               <div className="flex relative" key={index}>
//                 <img
//                   className="rounded-2xl w-full w-40 h-40 mt-2 mr-2 ml-2 border border-gray-300"
//                   src={"http://localhost:4000/uploads/" + link}
//                   alt={link}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
//                   onClick={() => deletePhoto(link)}
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//         </div>

//         <div className="mt-2 flex cursor-pointer">
//           <label className="h-32 flex border border-transparent cursor-pointer rounded-2xl p-6 ml-2">
//             <input
//               type="file"
//               multiple
//               className="hidden"
//               onChange={addPhoto}
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-6 h-6 mr-2 mb-1"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 16.5v2.25A2.25 2.25 0 005.25 21h2.25m9-4.5v2.25A2.25 2.25 0 0018.75 21h2.25m-9-4.5v2.25M9 12h3m-3 3h.008v.008H9v-.008zm-6-4.5h16.5a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0019.5 3H4.5A2.25 2.25 0 002.25 5.25v5.25A2.25 2.25 0 004.5 13.5z"
//               />
//             </svg>
//             Upload
//           </label>
//         </div>
//       </div>

//       <div className="text-2xl mb-4">
//         <label htmlFor="description" className="block mb-2">
//           Description:
//           <p className="text-sm" style={{ color: "red" }}>
//             (required)
//           </p>
//         </label>
//         <textarea
//           id="description"
//           className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//           type="text"
//           name="description"
//           placeholder="Describe your place for the attention of people"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>

//       <div className="text-2xl mb-4">
//         <label className="block mb-2">
//           Perks:
//           <p className="text-sm" style={{ color: "red" }}>
//             (required)
//           </p>
//         </label>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
//           {['wifi', 'parking', 'tv', 'radio', 'pets', 'private entrance'].map((perk) => (
//             <label className="border p-2 flex rounded-2xl gap-1 items-center cursor-pointer" key={perk}>
//               <input
//                 type="checkbox"
//                 checked={perks.includes(perk)}
//                 name={perk}
//                 value={perk}
//                 onChange={handleCheckboxChange}
//               />
//               <span className="text-xs">{perk}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="text-2xl mb-4">
//         <label htmlFor="extrainfo" className="block mb-2">
//           Extra Info:
//           <p className="text-sm" style={{ color: "red" }}>
//             (required)
//           </p>
//         </label>
//         <textarea
//           id="extrainfo"
//           className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//           name="extrainfo"
//           placeholder="Add your extra information here"
//           value={extrainfo}
//           onChange={(e) => setExtrainfo(e.target.value)}
//           required
//         />
//       </div>

//       <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
//         <div className="text-2xl mb-4">
//           <label htmlFor="checkin" className="block mb-2">
//             Check in time:
//             <p className="text-sm" style={{ color: "red" }}>
//               (required)
//             </p>
//           </label>
//           <input
//             id="checkin"
//             className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//             type="text"
//             placeholder="2PM"
//             value={checkin}
//             onChange={(e) => setCheckin(e.target.value)}
//             required
//           />
//         </div>

//         <div className="text-2xl mb-4">
//           <label htmlFor="checkout" className="block mb-2">
//             Check out time:
//             <p className="text-sm" style={{ color: "red" }}>
//               (required)
//             </p>
//           </label>
//           <input
//             id="checkout"
//             className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//             type="text"
//             placeholder="11AM"
//             value={checkout}
//             onChange={(e) => setCheckout(e.target.value)}
//             required
//           />
//         </div>

//         <div className="text-2xl mb-4">
//           <label htmlFor="maxguest" className="block mb-2">
//             Max Guests:
//             <p className="text-sm" style={{ color: "red" }}>
//               (required)
//             </p>
//           </label>
//           <input
//             id="maxguest"
//             className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//             type="number"
//             value={maxguest}
//             onChange={(e) => setMaxguest(e.target.value)}
//             required
//           />
//         </div>

//         <div className="text-2xl mb-4">
//           <label htmlFor="price" className="block mb-2">
//             Price:
//             <p className="text-sm" style={{ color: "red" }}>
//               (required)
//             </p>
//           </label>
//           <input
//             id="price"
//             className="w-full text-sm border border-gray-300 rounded py-2 px-3 text-gray-700"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <button
//           className="bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
//           type="submit"
//         >
//           Update Place
//         </button>

//         <button
//           type="button"
//           className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700 transition duration-300 ml-2"
//           onClick={handleDelete}
//         >
//           Delete
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditForm;
