import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-between border-t h-24 items-center px-8 mt-10">
      <div className="text-left">
        <p>@2024 Serufo Rent. Build By Raden Alam Sanjaya</p>
      </div>

      <div className="flex space-x-4">
        <Link href="/" className="ml-auto">
          About
        </Link>
        <Link href="/syarat-ketentuan">Syarat dan Ketentuan</Link>
      </div>
    </div>
  );
};

export default Footer;
