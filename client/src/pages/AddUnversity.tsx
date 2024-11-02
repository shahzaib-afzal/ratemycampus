import { useState, FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Image as ImageIcon, X, GraduationCap } from "lucide-react";
import axios from "axios";
import { useNotification } from "@/hooks/useNotification";
import { useLoadingButton } from "@/hooks/useLoadingButton";

export default function AddUniversity() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [topField, setTopField] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [campuses, setCampuses] = useState<string>("");
  const [mainCampus, setMainCampus] = useState<string>("");
  const { setShowNotification, setNotificationProps, notificationComponent } =
    useNotification();
  const { loading, setLoading, buttonContent } =
    useLoadingButton("Add University");

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (
    event: React.DragEvent<HTMLDivElement>,
    type: "logo" | "cover",
  ) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (type === "logo") setLogoFile(file);
      else setCoverFile(file);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "cover",
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      if (type === "logo") setLogoFile(file);
      else setCoverFile(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    formData.set("name", name);
    formData.set("status", status);
    formData.set("fee", fee);
    formData.set("topField", topField);
    formData.set("campuses", campuses);
    formData.set("maincampus", mainCampus);

    if (logoFile) formData.set("logo", logoFile);
    if (coverFile) formData.set("cover", coverFile);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
      await axios.post(`${backendUrl}/uni/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
      });
      setNotificationProps({
        message: `${name
          .split("(")[1]
          .split("")
          .filter((n: string) => n !== ")")
          .join("")} added successfully!`,
        status: "success",
      });
    } catch (error) {
      setNotificationProps({
        message:
          (axios.isAxiosError(error) && error.response?.data?.error) ||
          "Cannot Add University. Please try again.",
        status: "error",
      });
    } finally {
      setShowNotification(true);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#050520] via-[#1a0b2e] to-[#2a1b3d] p-4 text-white sm:p-8">
      <div className="absolute left-0 top-0 h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjIyIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10"></div>
      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white/10 shadow-2xl backdrop-blur-xl">
        <div className="p-8 sm:p-12">
          <div className="mb-8 flex items-center justify-center">
            <GraduationCap className="mr-4 h-12 w-12 text-purple-400" />
            <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              Add Your University
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-lg font-semibold text-purple-300"
                  >
                    University Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter university name"
                    className="border-white/10 bg-white/5 text-white transition-all duration-300 placeholder:text-white/50 focus:border-purple-500"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="fee"
                    className="text-lg font-semibold text-purple-300"
                  >
                    Fee Structure
                  </Label>
                  <Input
                    id="fee"
                    name="feeStructure"
                    placeholder="Describe fee structure"
                    className="border-white/10 bg-white/5 text-white transition-all duration-300 placeholder:text-white/50 focus:border-purple-500"
                    onChange={(e) => setFee(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="field"
                    className="text-lg font-semibold text-purple-300"
                  >
                    Top Academic Field
                  </Label>
                  <Input
                    id="field"
                    name="topAcademicField"
                    placeholder="e.g., Computer Science"
                    className="border-white/10 bg-white/5 text-white transition-all duration-300 placeholder:text-white/50 focus:border-purple-500"
                    onChange={(e) => setTopField(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="status"
                    className="text-lg font-semibold text-purple-300"
                  >
                    Status
                  </Label>
                  <Select onValueChange={(value) => setStatus(value)}>
                    <SelectTrigger className="border-white/10 bg-white/5 text-white transition-all duration-300 focus:border-purple-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="semi-govt">Semi-Govt.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="campuses"
                    className="text-lg font-semibold text-purple-300"
                  >
                    Number of Campuses
                  </Label>
                  <Input
                    id="campuses"
                    name="numberOfCampuses"
                    type="number"
                    placeholder="Enter number of campuses"
                    className="border-white/10 bg-white/5 text-white transition-all duration-300 placeholder:text-white/50 focus:border-purple-500"
                    onChange={(e) => setCampuses(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="main-campus"
                    className="text-lg font-semibold text-purple-300"
                  >
                    Main Campus Location
                  </Label>
                  <Input
                    id="main-campus"
                    name="mainCampusLocation"
                    placeholder="City, State"
                    className="border-white/10 bg-white/5 text-white transition-all duration-300 placeholder:text-white/50 focus:border-purple-500"
                    onChange={(e) => setMainCampus(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-purple-300">
                Logo Upload
              </Label>
              <div
                className="cursor-pointer rounded-lg border-2 border-dashed border-white/30 p-8 text-center transition-all duration-300 hover:border-purple-500 hover:bg-white/5"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleFileDrop(e, "logo")}
                onClick={() => logoInputRef.current?.click()}
              >
                {logoFile ? (
                  <div className="flex items-center justify-center space-x-2">
                    <ImageIcon className="h-6 w-6 text-purple-400" />
                    <span>{logoFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setLogoFile(null)}
                      className="text-white hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-12 w-12 text-purple-400" />
                    <p>Drag and drop your logo here, or click to select</p>
                    <Input
                      type="file"
                      id="logo"
                      name="logo"
                      ref={logoInputRef}
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "logo")}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-purple-300">
                Cover Photo Upload
              </Label>
              <div
                className="cursor-pointer rounded-lg border-2 border-dashed border-white/30 p-8 text-center transition-all duration-300 hover:border-purple-500 hover:bg-white/5"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleFileDrop(e, "cover")}
                onClick={() => coverInputRef.current?.click()}
              >
                {coverFile ? (
                  <div className="flex items-center justify-center space-x-2">
                    <ImageIcon className="h-6 w-6 text-purple-400" />
                    <span>{coverFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setCoverFile(null)}
                      className="text-white hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-12 w-12 text-purple-400" />
                    <p>
                      Drag and drop your cover photo here, or click to select
                    </p>
                    <Input
                      type="file"
                      id="coverPhoto"
                      name="coverPhoto"
                      ref={coverInputRef}
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "cover")}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full transform rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-6 text-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700"
              disabled={loading}
            >
              {buttonContent}
            </Button>
          </form>
        </div>
      </div>
      {notificationComponent}
    </div>
  );
}
