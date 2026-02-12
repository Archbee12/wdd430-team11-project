"use client";
import { useState } from "react";
import { updateArtisan } from "@/app/lib/actions";
import Image from "next/image";

type Artisan = {
  id: string;
  name: string;
  bio: string;
  location: string;
  image_url: string;
};

type ArtisanFormProps = {
  artisan: Artisan;
};

export default function ArtisanForm({ artisan }: ArtisanFormProps) {
  const [name, setName] = useState(artisan.name);
  const [bio, setBio] = useState(artisan.bio);
  const [location, setLocation] = useState(artisan.location);
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    let imageUrl = artisan.image_url;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      if (!res.ok) return setMessage("Image upload failed");
      const data = await res.json();
      imageUrl = data.imageUrl;
    }

    try {
      await updateArtisan(artisan.id, { name, bio, location, image_url: imageUrl });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
      <Image
        src={image ? URL.createObjectURL(image) : artisan.image_url}
        alt="Artisan Image"
        width={200}
        height={200}
      />
      <button type="submit">Update Profile</button>
    </form>
  );
}
