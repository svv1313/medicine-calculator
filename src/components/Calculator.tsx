"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import { doseData } from "@/shared/const/doseData";

const Calculator = () => {
  const [weight, setWeight] = useState<number>(0);
  const [type, setType] = useState<string>("vr");
  const [result, setResult] = useState<string>("");
  const { t } = useTranslation();

  const calculateDose = () => { 
    if (weight === 0 || !doseData[type][weight]) {
      setResult(t("invalidWeight"));
      return;
    }

    const [startDose, loadDose, minDose, maxDose] = doseData[type][weight];

    let resultText = "";
    if (type === "vr") {
      resultText = t("vrResult", {
        startDose,
        minDose,
        maxDose,
      });
    } else {
      resultText = t("procResult", {
        loadDose,
        startDose,
        minDose,
        maxDose,
      });
    }

    setResult(resultText);
  };

  return (
    <div className="font-sans p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{t("calculatorTitle")}</h2>
      <div className="mb-4">
        <label
          htmlFor="weight"
          className="block text-sm font-medium text-gray-700"
        >
          {t("weightLabel")}
        </label>
        <input
          type="number"
          id="weight"
          min="50"
          max="140"
          step="10"
          value={weight || ""}
          onChange={(e) =>
            setWeight(e.target.value ? parseInt(e.target.value) : 0)
          }
          placeholder={t("weightPlaceholder")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          {t("typeLabel")}
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="vr">{t("vrOption")}</option>
          <option value="proc">{t("procOption")}</option>
        </select>
      </div>
      <button
        onClick={calculateDose}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {t("calculateButton")}
      </button>
      <div
        className="result mt-6 text-lg font-semibold text-gray-800"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
};

export default Calculator;
