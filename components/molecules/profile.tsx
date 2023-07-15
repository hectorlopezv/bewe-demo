"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useProfileModal } from "@/hooks/use-profile-modal";
import { useStoreZ } from "@/store";
import {
  ProfileValidator,
  ProfileValidatorType,
} from "@/validators/profile-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Map from "../atoms/map";
import Modal from "../atoms/modal";

export default function Profile() {
  const user = useStoreZ((state) => state.user);
  const store = useStoreZ();
  const [loading, setLoading] = useState(false);
  const profileModal = useProfileModal();
  const form = useForm<ProfileValidatorType>({
    defaultValues: {
      name: "",
      email: "",
      location: "",
    },
    resolver: zodResolver(ProfileValidator),
  });

  const location = form.watch("location");
  const onSubmit = async (data: ProfileValidatorType) => {
    console.log("entre aqui");
    try {
      setLoading(true);
      store.updateUser({
        ...store.user,
        email: data.email,
        name: data.name,
        location: data.location,
      });

      profileModal.onClose();
      toast.success("adding link success");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form?.setValue("name", user?.name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form?.setValue("email", user?.email, {
      shouldDirty: true,
      shouldValidate: true,
    });

    form?.setValue("location", user?.location, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [form, user?.email, user?.location, user?.name]);

  return (
    <>
      <Modal
        description=""
        isOpen={profileModal.isOpen}
        onClose={() => profileModal.onClose()}
        title="Profile"
      >
        <div className="flex flex-col space-y-4 items-center justify-center">
          <Form {...form}>
            <form
              className="space-y-8 max-w-xl w-full pb-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex items-center justify-center ">
                <div className="flex-1 flex flex-col items-center justify-center space-y-2">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="">{user.email}</p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="location"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Map location={location || ""} />
              <Button
                disabled={loading}
                className="ml-auto w-full bg-[#007AFF] py-4 px-36"
                type="submit"
              >
                ADD
              </Button>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
}
