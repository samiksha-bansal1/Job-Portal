import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import UpdateProfile from "@/components/UpdateProfile";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-8 h-[75vh] mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-indigo-600 shadow-xl">
              <AvatarImage
                src={user?.profile?.profilePhoto || "public/useravatar.png"}
                alt="User Avatar"
                className="object-cover"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {user?.fullName}
              </h1>
              <p className="text-gray-600 text-md mt-2">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-indigo-600 hover:text-white hover:bg-indigo-600"
            onClick={() => setOpen(true)}
          >
            <Pen />
            Edit Profile
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-gray-600">
            <Mail className="text-indigo-600" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <Contact className="text-indigo-600" />
            <span>{user?.phoneNumber}</span>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            <div className="flex flex-wrap mt-2 gap-2">
              {user?.profile?.skills.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 cursor-pointer transition"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Label className="text-sm font-semibold text-gray-800">
              Resume
            </Label>
            {user?.profile?.resume ? (
              <a
                href={user?.profile?.resume}
                className="text-indigo-600 hover:text-indigo-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user?.profile?.resumeName}
              </a>
            ) : (
              <span className="text-gray-500">No resume uploaded</span>
            )}
          </div>
        </div>
      </div>

      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
