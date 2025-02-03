"use client"

import { useState, useEffect } from "react"

export default function Tool({ tool }) {
  const [bodyFatPercentage, setBodyFatPercentage] = useState(20.7)
  const [formData, setFormData] = useState({
    gender: "male",
    height: 183,
    weight: 83,
    waist: 93,
    neck: 39,
    hip: 90,
  })

  const calculateBodyFatPercentage = () => {
    const { gender, height, waist, neck, hip } = formData
    const result =
      gender === "male"
        ? 495 /
            (1.0324 -
              0.19077 * Math.log10(waist - neck) +
              0.15456 * Math.log10(height)) -
          450
        : 495 /
            (1.29579 -
              0.35004 * Math.log10(Number(waist) + Number(hip) - Number(neck)) +
              0.221 * Math.log10(height)) -
          450

    setBodyFatPercentage(result.toFixed(1))
  }

  const WEIGHT_WITHOUT_FAT = () => {
    return (
      formData.weight -
      (formData.weight * bodyFatPercentage) / 100
    ).toFixed(2)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    calculateBodyFatPercentage()
  }, [formData])

  const renderInputField = ({ name, type, options, hideForMale, min, max }) => {
    if (hideForMale && formData.gender === "male") return null
    return (
      <div key={name}>
        {type === "select" ? (
          <div className="flex border border-separate border-neutral-900 w-fit">
            <input
              type="radio"
              id={formData.gender}
              name="gender"
              value={formData.gender}
              className="hidden peer"
              onInput={handleChange}
              defaultChecked={formData.gender === "male"}
            />
            <label
              htmlFor={formData.gender}
              className="inline-flex px-2 py-2 w-fit cursor-pointer hover:text-neutral-300 border border-separate border-neutral-800 peer-checked:text-white text-neutral-400 hover:bg-neutral-900"
            >
              <p className="w-full text-lg font-semibold">{formData.gender}</p>
            </label>
          </div>
        ) : (
          <>
            <label htmlFor={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)} ({formData[name]})
            </label>
            <input
              type="range"
              name={name}
              min={min}
              max={max}
              className="select"
              onChange={handleChange}
              value={formData[name]}
            />
            <input
              type="number"
              name={name}
              className="select"
              onChange={handleChange}
              value={formData[name]}
            />
          </>
        )}
      </div>
    )
  }

  const inputFields = [
    { name: "gender", type: "select", options: ["male", "female"] },
    { name: "height", type: "both", min: 100, max: 250 },
    { name: "weight", type: "both", min: 30, max: 200 },
    { name: "waist", type: "both", min: 50, max: 150 },
    { name: "neck", type: "both", min: 20, max: 100 },
    { name: "hip", type: "both", min: 50, max: 150, hideForMale: true },
  ]

  return (
    <section className="h-screen pt-sectionY-m md:pt-sectionY flex flex-col items-center">
      <h1 className="mb-8">{tool.name}</h1>

      <div className="flex gap-16">
        <div className="flex flex-col gap-8">
          <div>
            <h3>Body Fat Percentage</h3>
            <p className="text-lg">{Math.round(bodyFatPercentage, 2)}%</p>
            <p className="text-sm text-neutral-500">
              Below 15% is considered as ideal.
            </p>
          </div>
          <div>
            <h3>Weight without fat</h3>
            <p className="text-lg">{WEIGHT_WITHOUT_FAT()} kg</p>
          </div>
        </div>
        <ul className="flex flex-col">
          <li className="flex border border-separate border-neutral-900 w-fit">
            <input
              type="radio"
              id={formData.gender}
              name="gender"
              value={formData.gender}
              className="hidden peer"
              onInput={handleChange}
              defaultChecked={formData.gender === "male"}
            />
            <label
              htmlFor={formData.gender}
              className="inline-flex px-2 py-2 w-fit cursor-pointer hover:text-neutral-300 border border-separate border-neutral-800 peer-checked:text-white text-neutral-400 hover:bg-neutral-900"
            >
              <p className="w-full text-lg font-semibold">{formData.gender}</p>
            </label>
          </li>
          {inputFields.map((field, i) => {
            if (field.type === "gender") return null
            return (
              <>
                <li key={i}>
                  <label htmlFor={field.name}>
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)} (
                    {formData[field.name]})
                  </label>
                  <input
                    type="range"
                    name={field.name}
                    min={field.min}
                    max={field.max}
                    className="select"
                    onChange={handleChange}
                    value={formData[field.name]}
                  />
                  <input
                    type="number"
                    name={field.name}
                    className="select"
                    onChange={handleChange}
                    value={formData[field.name]}
                  />
                </li>
              </>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
