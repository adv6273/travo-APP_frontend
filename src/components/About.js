// import React from 'react';

// const About = () => {
//   return (
//     <div className="h-full w-full bg-blue-100 flex  justify-center items-center">
//       <div className="max-w-4xl text-center p-10">
//         <h1 className="text-4xl font-bold mb-6">About Us</h1>
//         <p className="mb-6 text-lg ">
//           Welcome to travo-APP, the ultimate platform for all your accommodation needs. Whether you are looking to add your place, book a new one, or manage your existing bookings, our website provides a seamless and user-friendly experience designed with you in mind. Here’s a closer look at what we offer:
//         </p>
//         <h2 className="text-2xl font-bold mb-4">Key Features</h2>
//         <ul className="mb-6 text-left">
//           <li><strong>Add Your Place</strong>: Share your beautiful place with others. Easily add your property details, including photos, descriptions, and availability, to attract potential guests.</li>
//           <li><strong>Modify Your Place</strong>: Manage your listings effortlessly. If you decide to remove/change your place from our platform, you can do so with just a few clicks.</li>
//           <li><strong>Book Any Place</strong>: Explore a variety of places listed on our website. Find the perfect accommodation that suits your needs and book it instantly.</li>
//           <li><strong>Modify Bookings</strong>: Plans change, and we understand that. You can easily  cancel a reservation.</li>
//           <li><strong>Manage Booking Requests</strong>: If you have listed a place and received booking requests, you have full control over accepting or deleting those requests.</li>
//           <li><strong>Beautiful Design</strong>: Our website features a modern and aesthetically pleasing design. It’s not just about functionality but also about enjoying the process of finding and booking your next stay.</li>
//           <li><strong>Secure Authentication</strong>: Security is our top priority. We ensure that each user’s email and phone number are unique and securely authenticated to provide a safe experience.</li>
//           <li><strong>Simple and Easy to Use</strong>: We believe in simplicity. Our platform is designed to be intuitive and straightforward, making it easy for everyone to use.</li>
//           <li><strong>Photo Gallery</strong>: To keep the place pages simple and uncluttered, we display only 3 photos initially. You can view all photos in a dedicated gallery component.</li>
//           <li><strong>Date Restrictions</strong>: You cannot choose a check-in date in the past, and the check-out date must be later than the check-in date. Guest name and phone number are mandatory.</li>
//           {/* Additional points */}
//           <li><strong>Send Messages</strong>: Connect with us easily by sending messages through our social media pages.</li>
//           <li><strong>Contact on Social Media</strong>: Follow our social media pages for updates and direct communication.</li>
//         </ul>
       
//       </div>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import home from '../website-pics/home.png'
import login from '../website-pics/login.png'
import register from '../website-pics/register.png'
import editplace from '../website-pics/editplace.png'
import editplace1 from '../website-pics/editplace1.png'
import editplace2 from '../website-pics/editplace2.png'
import addnewplace from '../website-pics/addnewplace.png';
import addnewplace2 from '../website-pics/addnewplace2.png';
import myplaces from '../website-pics/myplaces.png';
// import modifyPlace from '../website-pics/modify_place.jpg';
import bookPlace from '../website-pics/bookplace.png';
import profile from '../website-pics/profile.png';
import mybookings from '../website-pics/mybookings.png';
import bookingrequests from '../website-pics/bookingrequests.png';
// import modifyBooking from '../website-pics/modify_booking.jpg';

const About = () => {
  return (
    <div className="h-full w-full bg-blue-100 flex justify-center items-center">
      <div className="max-w-4xl text-center p-10">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="mb-6 text-lg">
          Welcome to travo-APP, the ultimate platform for all your accommodation needs. Whether you are looking to add your place, book a new one, or manage your existing bookings, our website provides a seamless and user-friendly experience designed with you in mind. Here’s a closer look at what we offer:
        </p>
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <ul className="mb-6 text-left">
          <li><strong>Add Your Place</strong>: Share your beautiful place with others. Easily add your property details, including photos, descriptions, and availability, to attract potential guests.</li>
          <li><strong>Modify Your Place</strong>: Manage your listings effortlessly. If you decide to remove/change your place from our platform, you can do so with just a few clicks.</li>
          <li><strong>Book Any Place</strong>: Explore a variety of places listed on our website. Find the perfect accommodation that suits your needs and book it instantly.</li>
          <li><strong>Modify Bookings</strong>: Plans change, and we understand that. You can easily cancel a reservation.</li>
          <li><strong>Manage Booking Requests</strong>: If you have listed a place and received booking requests, you have full control over accepting or deleting those requests.</li>
          <li><strong>Beautiful Design</strong>: Our website features a modern and aesthetically pleasing design. It’s not just about functionality but also about enjoying the process of finding and booking your next stay.</li>
          <li><strong>Secure Authentication</strong>: Security is our top priority. We ensure that each user’s email and phone number are unique and securely authenticated to provide a safe experience.</li>
          <li><strong>Simple and Easy to Use</strong>: We believe in simplicity. Our platform is designed to be intuitive and straightforward, making it easy for everyone to use.</li>
          <li><strong>Photo Gallery</strong>: To keep the place pages simple and uncluttered, we display only 3 photos initially. You can view all photos in a dedicated gallery component.</li>
          <li><strong>Date Restrictions</strong>: You cannot choose a check-in date in the past, and the check-out date must be later than the check-in date. Guest name and phone number are mandatory.</li>
          <li><strong>Send Messages</strong>: Connect with us easily by sending messages through our social media pages.</li>
          <li><strong>Contact on Social Media</strong>: Follow our social media pages for updates and direct communication.</li>
        </ul>

        {/* Example Images of Website Functionality */}
        <h2 className="text-2xl font-bold mb-4">Website Functionality</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img src={home} alt="home" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center">Home</p>
          </div>
          <div>
            <img src={login} alt="home" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center">login</p>
          </div>
          <div>
            <img src={register} alt="home" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center">register</p>
          </div>
          <div>
            <img src={profile} alt="Modify Bookings" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center">Your Profile</p>
          </div>
          <div>
            <img src={addnewplace} alt="Add Your Place" className="w-full h-auto rounded-lg shadow-md" />
            <img src={addnewplace2} alt="Add Your Place" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center">Add Your Place</p>
          </div>
          <div>
            <img src={myplaces} alt="Add Your Place" className="w-full h-auto rounded-lg shadow-md" />
            {/* <img src={addnewplace2} alt="Add Your Place" className="w-full h-auto rounded-lg shadow-md" /> */}
            <p className="mt-2 text-center">Your Places</p>
          </div>
          <div>
            <img src={editplace} alt="Modify Your Place" className="w-full h-auto rounded-lg shadow-md" />
            <img src={editplace1} alt="Modify Your Place" className="w-full h-auto rounded-lg shadow-md" />
            <img src={editplace2} alt="Modify Your Place" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center">Modify Your Place</p>
          </div>
          <div>
            <img src={bookPlace} alt="Book Any Place" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center">Book Any Place</p>
          </div>
          <div>
            <img src={mybookings} alt="Modify Bookings" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center">Your Bookings</p>
          </div>
          <div>
            <img src={bookingrequests} alt="Modify Bookings" className="w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-center"> Booking Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
