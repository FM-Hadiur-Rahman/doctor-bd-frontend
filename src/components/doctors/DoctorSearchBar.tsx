"use client";

import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

type Props = {
  onSearch: (filters: { search: string; district: string }) => void;
};

export default function DoctorSearchBar({ onSearch }: Props) {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("");

  return (
    <div className="rounded-3xl bg-white p-4 shadow-xl ring-1 ring-slate-100">
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Doctor, specialty, clinic"
            className="pl-12"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Dhaka, Chittagong, Sylhet"
            className="pl-12"
          />
        </div>

        <Button
          variant="dark"
          className="px-8"
          onClick={() => onSearch({ search, district })}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
