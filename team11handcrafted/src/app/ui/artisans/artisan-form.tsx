"use client";

import { useState } from "react";
import { updateArtisan } from "@/app/lib/actions";
import Image from "next/image";
import FormCard from "@/app/ui/form/form-card";
import styles from "@/app/ui/form/form-card.module.css";

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
  const [name, setName] = useState(artisan.name ?? "");
  const [bio, setBio] = useState(artisan.bio ?? "");
  const [location, setLocation] = useState(artisan.location ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    let imageUrl = artisan.image_url;

    // Upload new image if selected
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

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this artisan? This will remove all related data."
    );
    if (!confirmed) return;

    try {
      // Call a new server action: deleteArtisan
      const res = await fetch(`/api/artisans/${artisan.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete artisan");
      alert("Artisan deleted successfully!");
      // Optionally, redirect to dashboard or artisans list
      window.location.href = "/dashboard/artisans";
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to delete artisan");
    }
  };

  return (
    <FormCard title="Edit Artisan" message={message}>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
      </div>

      <div className={styles.formGroup}>
        <label>Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />
        <Image
          src={image ? URL.createObjectURL(image) : artisan.image_url || "/images/artisans/placeholder.jpg"}
          alt="Artisan Image"
          width={200}
          height={200}
          className={styles.imagePreview}
        />
      </div>

      <button type="submit" className={styles.button} onClick={handleSubmit}>
        Update Profile
      </button>

      <button
        type="button"
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={handleDelete}
      >
        Delete Artisan
      </button>
    </FormCard>
  );
}
