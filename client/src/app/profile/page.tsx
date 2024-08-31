import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProfileForm from "@/components/Profile/ProfileForm";

//============METADATA============================
import { Metadata } from "next";

/*import {
  FaFacebook,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa"; */

export const metadata: Metadata = {
  title: "Parking",
  description: "Perfil de cuenta de parking",
};
//================================================
const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-4xl">
        <Breadcrumb pageName="Perfil" />

        <ProfileForm />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
