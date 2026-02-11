import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/services/auth/mutations';
import { useAuth } from '@/context/AuthContext';



// Zod schema
const formSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});




export default function Login() {


  // Login Mutation
  const { mutate: Loginmutation, isPending } = useLogin();



  // Auth Context
  const { login } = useAuth();



  // Form State
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);




  // Use React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });





  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {


    const formdata = new FormData();
    formdata.append('username', data.username);
    formdata.append('password', data.password);


    Loginmutation(formdata, {

      onSuccess: (response) => {

        login(response);
        form.reset()

      }

    });

  };



  return (


    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>


      {/* username Field */}
      <Controller
        control={form.control}
        name="username"
        render={({ field, fieldState }) => (
          <div className="space-y-2 animate-fade-in delay-200">
            <Label htmlFor="username" className="text-gray-300 font-medium">Username</Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...field}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => {
                  field.onBlur();
                  setUsernameFocused(false);
                }}
                className={`bg-black/40 border-gray-700/50 text-white placeholder-gray-500 transition-all duration-500 hover:bg-black/60 hover:border-gray-600/70 ${usernameFocused ? 'border-purple-500/70 ring-2 ring-purple-500/20 bg-black/60 shadow-lg shadow-purple-500/10' : ''
                  }`}
              />
              {usernameFocused && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-md pointer-events-none animate-pulse"></div>
              )}
            </div>
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />


      {/* Password Field */}
      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <div className="space-y-2 animate-fade-in delay-300">
            <Label htmlFor="password" className="text-gray-300 font-medium">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...field}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => {
                  field.onBlur();
                  setPasswordFocused(false);
                }}
                className={`pr-12 bg-black/40 border-gray-700/50 text-white placeholder-gray-500 transition-all duration-500 hover:bg-black/60 hover:border-gray-600/70 ${passwordFocused
                  ? 'border-purple-500/70 ring-2 ring-purple-500/20 bg-black/60 shadow-lg shadow-purple-500/10'
                  : ''
                  }`}
              />

              {/* Eye Icon Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              {passwordFocused && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-md pointer-events-none animate-pulse"></div>
              )}
            </div>
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />


      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className={`w-full hover:cursor-pointer bg-gradient-to-r from-purple-700 via-blue-700 to-purple-700 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 animate-fade-in delay-400 relative overflow-hidden group border-0 ${isPending ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
        <div className="relative flex items-center justify-center gap-2">
          {isPending ? (<LoaderCircle className='w-5 h-5 animate-spin' />) : (<User className='w-5 h-5' />)}
          Sign In
        </div>
      </Button>


    </form>
  );
}
