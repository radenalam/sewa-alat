import { Button, Link } from "@radix-ui/themes";
import React from "react";

const page = () => {
  return (
    <div>
      <Link href="/admin">
        <Button>Admin</Button>
      </Link>
    </div>
  );
};

export default page;
