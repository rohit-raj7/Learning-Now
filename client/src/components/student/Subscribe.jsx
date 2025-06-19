import React from 'react';
import { toast } from 'react-toastify';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    const email = formData.get("Email");

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      setResult("");
      return;
    }

    try {
      formData.append('access_key', "d602e0c4-d3d9-4f64-a4d3-4aefd961d155");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("");
        toast.success("Submitted Successfully");
        event.target.reset();
      } else {
        console.error("Error:", data);
        toast.error(data.message);
        setResult("");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("There was an error submitting the form.");
      setResult("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='flex flex-row gap-2'>
          <input 
            type="email" 
            name="Email"
            placeholder="Enter your email"
            className="p-2 rounded bg-gray-800 text-gray-200 border border-green-500 focus:outline-none w-full md:w-auto custom-placeholder"
          />
          <button type="submit" className='py-2 px-4 rounded bg-green-500 text-gray-100'>
            {result ? result : "Submit"}
          </button>
        </div>
      </form>
 
      <style jsx>{`
        .custom-placeholder::placeholder {
          color: #22c55e;
          opacity: 1; 
        }
      `}</style>
    </div>
  );
}

export default Contact;
