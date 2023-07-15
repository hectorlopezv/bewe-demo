"use client";
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
import { useStoreZ } from "@/store";
import {
  SignUpValidator,
  SignUpValidatorType,
} from "@/validators/sign-up-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const user = useStoreZ();
  const form = useForm<SignUpValidatorType>({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    resolver: zodResolver(SignUpValidator),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (info: SignUpValidatorType) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/sign-up", {
        email: info.email,
        password: info.password,
        fullName: info.fullName,
      });

      user.updateUser(data.data);
      user.updateAuth(true);
      toast.success("Login success");
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <Image src="/svgs/logo.svg" height={90} width={102} alt="logo" priority />

      <Form {...form}>
        <form
          className="space-y-8 max-w-xl w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-2xl text-left">Signup</h2>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={loading}
                    placeholder="Full name"
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
                    type="email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    placeholder="Password"
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
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
