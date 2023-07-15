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
  LinkValidator,
  LinkValidatorType,
} from "@/validators/add-new-url-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Profile from "./profile";

export default function HomePageClient() {
  const user = useStoreZ((state) => state.user);
  const profileModal = useProfileModal();
  const form = useForm<LinkValidatorType>({
    defaultValues: {
      name: "",
      url: "",
    },
    resolver: zodResolver(LinkValidator),
  });

  const store = useStoreZ();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LinkValidatorType) => {
    try {
      setLoading(true);

      store.addLink({ ...data });
      toast.success("adding link success");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };
  const deleteHandler = (url: string) => {
    try {
      setLoading(true);
      store.deleteLink(url);
      toast.success("delete url success");
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const EditProfile = () => {
    profileModal.onOpen();
  };
  return (
    <>
      <Profile />
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
              <Edit2
                className="w-8 h-8 ml-auto cursor-pointer"
                onClick={EditProfile}
              />
            </div>

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL to save</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="URL to save"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of url</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Name of url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              className="ml-auto w-full bg-[#007AFF] py-4 px-36"
              type="submit"
            >
              ADD
            </Button>
          </form>

          {store.links.map((link) => (
            <div key={link.name} className="max-w-xl w-full">
              <div className="flex justify-between">
                <p className="text-[#007AFF]">{link.url}</p>
                <Trash
                  className="text-[#FF5C6C] w-4 h-4 cursor-pointer"
                  onClick={() => deleteHandler(link.url)}
                />
              </div>
              <p className="text-[#002239] pt-4">{link.name}</p>
            </div>
          ))}
        </Form>
      </div>
    </>
  );
}
