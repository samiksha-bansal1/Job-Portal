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
    <div className="space-y-4">
      <div className="bg-white rounded border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <div className="mt-4 sapce-y-2">
          <div className="flex items-center gap-4">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
          <div>
            <h1 className="font-semibold">Skills</h1>
            <div className="flex flex-wrap mt-2">
               
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((skill, index) => (
                  <Badge className="mr-2" key={index}>{skill}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Label className="text-sm font-semibold">Resume</Label>
            {user?.profile?.resume ? (
              <a href={user?.profile?.resume}>{user?.profile?.resumeName}</a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <UpdateProfile open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
