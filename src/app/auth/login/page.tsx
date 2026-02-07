"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Redirect to dashboard on successful login
      router.push("/");
    }, 500);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-full h-full gap-0 ">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-1 bg-linear-to-br from-[#001F3F] to-[#002d5c] rounded-3xl m-8 p-8 md:p-12 flex-col justify-between text-white">
          <div>
            {/* Logo */}
            <div className="mb-8 md:mb-12">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                <Image
                  src="/logo-gima.png"
                  alt="GIMA Logo"
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl font-bold leading-tight mb-12">
              Gestión
              <br />
              Inteligente de
              <br />
              Activos y<br />
              Mantenimiento
            </h1>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center border border-white/20">
              <div className="inline-block p-2 md:p-3 bg-white/10 rounded-lg mb-3 md:mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold">Seguridad</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="inline-block p-3 bg-white/10 rounded-lg mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold">Eficiencia</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="inline-block p-3 bg-white/10 rounded-lg mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <p className="text-sm font-semibold">Control</p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Bienvenido
            </h2>
            <p className="text-gray-600">
              Por favor, ingrese su usuario y<br />
              contraseña para acceder al sistema.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Pedro_perez"
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Pedro123"
                  className="w-full pl-12 pr-12 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 border border-gray-300 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-600">Recuérdame</span>
              </label>
              <Link
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Accede al sistema
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
