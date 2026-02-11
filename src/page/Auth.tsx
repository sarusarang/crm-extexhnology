import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Login from '@/components/auth/Login';



const Auth = () => {


  return (


    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">


      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-600/30 via-blue-600/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-pink-600/25 via-purple-600/15 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-600/20 to-cyan-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-bl from-violet-600/25 to-blue-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>



      {/* Moving particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>


      {/* Animated gradient mesh */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-600/5 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>



      <Card className="w-full max-w-md mx-4 shadow-2xl border-0 bg-black/60 backdrop-blur-xl relative z-10 animate-fade-in overflow-hidden">


        {/* Animated border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 via-blue-600/50 to-pink-600/50 rounded-lg animate-glow"></div>
        <div className="absolute inset-[1px] bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 rounded-lg backdrop-blur-xl"></div>



        <div className="relative z-10">


          <CardHeader className="space-y-4 text-center">

            {/* Company Logo */}
            <div className="mx-auto w-full h-20 mb-4 flex items-center justify-center">
              <img
                src="/Logo.png" 
                alt="Company Logo"
                loading='lazy'
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <CardTitle className="pb-5 text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-fade-in">
                Project Manager
              </CardTitle>
            </div>

          </CardHeader>


          <CardContent className="space-y-6">

            {/* Login Form */}
            <Login />

            {/* Decorative elements */}
            <div className="flex items-center justify-center space-x-4 mt-8 animate-fade-in delay-500">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent via-purple-500/50 to-transparent"></div>
            </div>

          </CardContent>

        </div>

      </Card>

    </div>
  );
};

export default Auth;