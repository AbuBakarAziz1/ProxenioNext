"use client"

const ProfileForm = () => {
    return (
      <form className="space-y-4">
        <h4 className="mb-4">Profile Creation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="font-medium">Full Name <span className="text-red-500">*</span></label>
            <input type="text" className="form-input" placeholder="Enter here" />
          </div>
  
          {/* Age */}
          <div className="flex flex-col">
            <label className="font-medium">Age <span className="text-red-500">*</span></label>
            <input type="number" className="form-input" placeholder="Enter here" />
          </div>
  
          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium">Email <span className="text-red-500">*</span></label>
            <input type="email" className="form-input" placeholder="Enter here" />
          </div>
  
          {/* Phone */}
          <div className="flex flex-col">
            <label className="font-medium">Phone Number <span className="text-red-500">*</span></label>
            <input type="text" className="form-input" placeholder="Enter here" />
          </div>
  
          {/* City */}
          <div className="flex flex-col">
            <label className="font-medium">City <span className="text-red-500">*</span></label>
            <input type="text" className="form-input" placeholder="Enter here" />
          </div>
  
          {/* Country */}
          <div className="flex flex-col">
            <label className="font-medium">Country <span className="text-red-500">*</span></label>
            <input type="text" className="form-input" placeholder="Enter here" />
          </div>
        </div>
  
        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-red-500 text-white px-5 py-2 rounded-md">Next</button>
        </div>
      </form>
    );
  };
  
  export default ProfileForm;
  