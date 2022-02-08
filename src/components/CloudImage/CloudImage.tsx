import { Image, Transformation } from "cloudinary-react";

type CloudImageProps = {
  publicId: string;
};
const CloudImage = ({ publicId }: CloudImageProps) => {
  return (
    <Image
      className="absolute inset-0"
      loading="lazy"
      cloudName="kariecloud"
      publicId={publicId}
    >
      <Transformation height="150" width="150" crop="fill" radius="20" />
    </Image>
  );
};

export default CloudImage;
