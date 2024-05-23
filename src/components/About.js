import React from 'react';

const About = () => {
  return (
    <div className="h-full w-full bg-blue-100 flex  justify-center items-center">
      <div className="max-w-4xl text-center p-10">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="mb-6 text-lg ">
          Welcome to travo-APP, the ultimate platform for all your accommodation needs. Whether you are looking to add your place, book a new one, or manage your existing bookings, our website provides a seamless and user-friendly experience designed with you in mind. Here’s a closer look at what we offer:
        </p>
        <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        <ul className="mb-6 text-left">
          <li><strong>Add Your Place</strong>: Share your beautiful place with others. Easily add your property details, including photos, descriptions, and availability, to attract potential guests.</li>
          <li><strong>Modify Your Place</strong>: Manage your listings effortlessly. If you decide to remove/change your place from our platform, you can do so with just a few clicks.</li>
          <li><strong>Book Any Place</strong>: Explore a variety of places listed on our website. Find the perfect accommodation that suits your needs and book it instantly.</li>
          <li><strong>Modify Bookings</strong>: Plans change, and we understand that. You can easily  cancel a reservation.</li>
          <li><strong>Manage Booking Requests</strong>: If you have listed a place and received booking requests, you have full control over accepting or deleting those requests.</li>
          <li><strong>Beautiful Design</strong>: Our website features a modern and aesthetically pleasing design. It’s not just about functionality but also about enjoying the process of finding and booking your next stay.</li>
          <li><strong>Secure Authentication</strong>: Security is our top priority. We ensure that each user’s email and phone number are unique and securely authenticated to provide a safe experience.</li>
          <li><strong>Simple and Easy to Use</strong>: We believe in simplicity. Our platform is designed to be intuitive and straightforward, making it easy for everyone to use.</li>
          <li><strong>Photo Gallery</strong>: To keep the place pages simple and uncluttered, we display only 3 photos initially. You can view all photos in a dedicated gallery component.</li>
          <li><strong>Date Restrictions</strong>: You cannot choose a check-in date in the past, and the check-out date must be later than the check-in date. Guest name and phone number are mandatory.</li>
          {/* Additional points */}
          <li><strong>Send Messages</strong>: Connect with us easily by sending messages through our social media pages.</li>
          <li><strong>Contact on Social Media</strong>: Follow our social media pages for updates and direct communication.</li>
        </ul>
       
      </div>
    </div>
  );
};

export default About;
