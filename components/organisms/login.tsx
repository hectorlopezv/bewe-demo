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
  SignInValidator,
  SignInValidatorType,
} from "@/validators/sign-in-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
export default function Login() {
  const form = useForm<SignInValidatorType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInValidator),
  });
  const user = useStoreZ();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (info: SignInValidatorType) => {
    try {
      setLoading(true);

      const {data} = await axios.post("/api/sign-in", {
        email: info.email,
        password: info.password,
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
          <h2 className="font-bold text-2xl text-left">Login</h2>
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
