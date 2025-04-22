"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createStartup, Startup } from "@/app/api/backend/startupsApi";

export default function RegisterStartup() {
  const [name, setName] = useState("");
  const [foundedYear, setFoundedYear] = useState<number | undefined>();
  const [customYear, setCustomYear] = useState<string>("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i).reverse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const finalYear = customYear ? Number(customYear) : foundedYear;

    if (!finalYear || isNaN(finalYear) || finalYear > currentYear) {
      setError("Por favor, insira ou selecione um ano válido (não maior que o ano atual).");
      setLoading(false);
      return;
    }

    const newStartup: Startup = {
      name,
      slogan,
      foundedYear: finalYear,
      description,
    };

    try {
      await createStartup(newStartup);
      router.push("/dashboard/startups");
    } catch (err) {
      setError("Erro ao registrar a startup. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registrar Nova Startup</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Startup <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nome da Startup"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ano de Fundação <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={foundedYear || ""}
                onChange={(e) => {
                  setFoundedYear(Number(e.target.value));
                  setCustomYear("");
                }}
                required
              >
                <option value="" disabled>
                  Selecione o ano
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                className="w-1/3 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Outro ano"
                value={customYear}
                onChange={(e) => {
                  const inputYear = e.target.value;
                  if (inputYear.length <= 4) {
                    const sanitizedYear = inputYear.replace(/^0+/, "");
                    if (Number(sanitizedYear) <= currentYear) {
                      setCustomYear(sanitizedYear);
                      setFoundedYear(undefined);
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "+" ||
                    e.key === "-" ||
                    e.key === "."
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slogan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Slogan ou descrição curta"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Descreva detalhadamente a startup"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            onClick={() => router.back()}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Startup"}
          </button>
        </div>
      </form>
    </div>
  );
}