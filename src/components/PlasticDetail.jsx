import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRecycle, FaFish, FaExclamationTriangle, FaTshirt, FaCouch, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { GiPlasticDuck } from "react-icons/gi"; // Example extra icons

const PLASTIC_DETAILS = {
  PET: {
    name: "PET (Polyethylene Terephthalate)",
    symbol: "♳",
    number: "#1",
    properties: "Lightweight, strong, transparent",
    uses: "Beverage bottles, food containers",
    recyclability: "Widely recycled",
    degradation: "Takes over 450 years to decompose",
    ecology: "Contributes to microplastic pollution, harms marine life",
    carbon: "Energy-intensive production and disposal",
    resource: "Derived from fossil fuels",
    health: "PET may leach trace chemicals (like antimony) when exposed to high heat or prolonged storage.",
    recycleInto: ["New bottles", "Fleece jackets", "Carpets", "Strapping material"],
    india: [
      "India has one of the highest PET collection rates (~90%).",
      "Informal recycling networks play a key role.",
      "Ongoing initiatives: Swachh Bharat PET drives."
    ],
    segregation: [
      "Rinse containers thoroughly",
      "Remove caps/lids (check if separately recyclable)",
      "Peel labels if detachable",
      "Crush/flatten to save space"
    ],
    dontInclude: [
      "No plastic bags",
      "No mixed plastics"
    ],
    quiz: {
      question: "Can PET be recycled into plastic bags?",
      options: ["Yes", "No"],
      correct: "No",
      explanation: "PET is not typically recycled into bags; LDPE is used for most bags."
    },
    wiki: "https://en.wikipedia.org/wiki/Polyethylene_terephthalate"
  },
  HDPE: {
    name: "HDPE (High-Density Polyethylene)",
    symbol: "♴",
    number: "#2",
    properties: "Strong, opaque, resistant to impact",
    uses: "Milk jugs, detergent bottles, toys",
    recyclability: "Widely recycled",
    degradation: "500+ years to decompose",
    ecology: "Clogs waterways and threatens wildlife",
    carbon: "Lower footprint than PET but still petroleum-based",
    resource: "Made from fossil fuels",
    health: "Generally safe but can release toxins if burned.",
    recycleInto: ["Pipes", "Plastic lumber", "Bins", "Floor tiles"],
    india: [
      "Collected by kabadiwalas and municipal drives.",
      "High resale value encourages recycling."
    ],
    segregation: [
      "Rinse bottles and containers",
      "Remove caps/lids (recycle separately if possible)",
      "Labels can remain",
      "Flatten if possible"
    ],
    dontInclude: [
      "No motor oil containers",
      "No chemical-stained plastics"
    ],
    quiz: {
      question: "Are HDPE milk jugs usually recycled in India?",
      options: ["Yes", "No"],
      correct: "Yes",
      explanation: "HDPE is widely recycled, especially for milk jugs and detergent bottles."
    },
    wiki: "https://en.wikipedia.org/wiki/High-density_polyethylene"
  },
  PVC: {
    name: "PVC (Polyvinyl Chloride)",
    symbol: "♵",
    number: "#3",
    properties: "Rigid, resistant to chemicals",
    uses: "Plumbing pipes, toys, medical devices",
    recyclability: "Rarely recycled",
    degradation: "Indefinite persistence in environment",
    ecology: "Releases dioxins when burned",
    carbon: "High environmental burden in production",
    resource: "Chlorine-based plastic from fossil fuels",
    health: "May release harmful additives (phthalates, lead).",
    recycleInto: ["Flooring", "Panels (limited)", "Industrial piping"],
    india: [
      "Recycling mostly informal; limited infrastructure.",
      "Often improperly discarded or burnt."
    ],
    segregation: [
      "Check local guidelines before recycling",
      "Avoid mixing with food plastics",
      "Remove any attached non-plastic materials"
    ],
    dontInclude: [
      "No medical waste",
      "No flexible PVC with mixed materials"
    ],
    quiz: {
      question: "Is PVC (type #3) commonly recycled?",
      options: ["Yes", "No"],
      correct: "No",
      explanation: "PVC is rarely recycled due to its chemical additives."
    },
    wiki: "https://en.wikipedia.org/wiki/Polyvinyl_chloride"
  },
  LDPE: {
    name: "LDPE (Low-Density Polyethylene)",
    symbol: "♶",
    number: "#4",
    properties: "Flexible, lightweight",
    uses: "Grocery bags, food wraps",
    recyclability: "Not commonly recycled",
    degradation: "Over 500 years",
    ecology: "Major contributor to marine litter.",
    carbon: "Petroleum-based production.",
    resource: "Low recycling incentive due to low value.",
    health: "Low risk in food contact but dangerous if burned.",
    recycleInto: ["Bin liners", "Floor tiles", "Shipping envelopes"],
    india: [
      "Banned in some states (plastic bag bans).",
      "Collected sporadically by informal workers."
    ],
    segregation: [
      "Clean and dry before recycling",
      "Bundle bags together for easier collection",
      "Remove food residues"
    ],
    dontInclude: [
      "No colored bags",
      "No bags with food waste"
    ],
    quiz: {
      question: "Are most plastic carry bags in India made from LDPE?",
      options: ["Yes", "No"],
      correct: "Yes",
      explanation: "Most plastic shopping bags are made of LDPE (#4)."
    },
    wiki: "https://en.wikipedia.org/wiki/Low-density_polyethylene"
  },
  PP: {
    name: "PP (Polypropylene)",
    symbol: "♷",
    number: "#5",
    properties: "Durable, heat resistant",
    uses: "Yogurt containers, straws",
    recyclability: "Limited recycling options",
    degradation: "20–30 years (fragments remain longer)",
    ecology: "Forms microplastics in soil/water.",
    carbon: "Moderate footprint; recyclable in some cities.",
    resource: "Derived from petrochemicals.",
    health: "Generally safe for food use.",
    recycleInto: ["Battery cases", "Signal lights", "Brooms"],
    india: [
      "Growing recycling efforts in organized plants.",
      "Low-value waste often ignored by collectors."
    ],
    segregation: [
      "Rinse and clean containers",
      "Check if your city collects #5",
      "Avoid mixing with soft plastics"
    ],
    dontInclude: [
      "No bottle caps with metal inserts",
      "No food-soiled containers"
    ],
    quiz: {
      question: "Is PP (Polypropylene) always accepted in Indian recycling?",
      options: ["Yes", "No"],
      correct: "No",
      explanation: "PP recycling is still limited in most regions."
    },
    wiki: "https://en.wikipedia.org/wiki/Polypropylene"
  },
  PS: {
    name: "PS (Polystyrene)",
    symbol: "♸",
    number: "#6",
    properties: "Rigid or foamed, inexpensive",
    uses: "Disposable cutlery, packaging",
    recyclability: "Difficult to recycle",
    degradation: "500+ years (breaks into microplastics)",
    ecology: "Harmful to marine animals and birds.",
    carbon: "High emissions during manufacturing.",
    resource: "Fossil fuel derived.",
    health: "Can release styrene (suspected carcinogen).",
    recycleInto: ["Insulation boards (rarely)", "Packaging fillers"],
    india: [
      "Often banned in food service.",
      "Recycling minimal due to contamination issues."
    ],
    segregation: [
      "Avoid food-contaminated PS",
      "Check for special recycling drop-offs",
      "Keep separate from other plastics"
    ],
    dontInclude: [
      "No foam food trays",
      "No colored or dyed polystyrene"
    ],
    quiz: {
      question: "Is PS (type #6) easy to recycle in India?",
      options: ["Yes", "No"],
      correct: "No",
      explanation: "PS recycling is very limited in India."
    },
    wiki: "https://en.wikipedia.org/wiki/Polystyrene"
  },
  OTHER: {
    name: "Other (Various Types)",
    symbol: "♹",
    number: "#7",
    properties: "Includes acrylic, polycarbonate",
    uses: "Diverse applications (e.g., bottles, sunglasses, DVDs)",
    recyclability: "Varies by type",
    degradation: "Unknown / varies widely",
    ecology: "Diverse impacts; often landfilled.",
    carbon: "Depends on type.",
    resource: "Mixed materials hard to recycle.",
    health: "May contain BPA and harmful chemicals.",
    recycleInto: ["Specialty goods (limited)", "Industrial uses"],
    india: [
      "Recycling uncommon; niche initiatives exist.",
      "Public awareness low for these plastics."
    ],
    segregation: [
      "Check local rules for #7 plastics",
      "Keep separate from other plastics",
      "Label before giving for recycling"
    ],
    dontInclude: [
      "No mixed-material items",
      "No unknown or unlabelled plastics"
    ],
    quiz: {
      question: "Are #7 plastics always recyclable?",
      options: ["Yes", "No"],
      correct: "No",
      explanation: "#7 includes many types, most are not recycled."
    },
    wiki: "https://en.wikipedia.org/wiki/Resin_identification_code"
  }
};


export default function PlasticDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const info = PLASTIC_DETAILS[type] || PLASTIC_DETAILS["PET"];
  const [quizAnswer, setQuizAnswer] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-green-700">{info.name}</h1>
          <p className="text-2xl text-green-600 flex items-center gap-2">
            <FaRecycle /> {info.symbol} {info.number}
          </p>
        </div>
      </header>

      {/* Key Info Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg shadow">
          <h3 className="font-semibold text-green-700">Properties</h3>
          <p>{info.properties}</p>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h3 className="font-semibold text-green-700">Common Uses</h3>
          <p>{info.uses}</p>
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h3 className="font-semibold text-green-700">Recyclability</h3>
          <p>{info.recyclability}</p>
        </div>
      </section>

      {/* Environmental Impact */}
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-3">Environmental Impact</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><strong>Degradation Time:</strong> {info.degradation}</li>
          <li><strong>Ecological Effects:</strong> {info.ecology}</li>
          <li><strong>Carbon Footprint:</strong> {info.carbon}</li>
          <li><strong>Resource Depletion:</strong> {info.resource}</li>
        </ul>
      </section>

      {/* Health Concerns */}
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-3">Health Concerns</h2>
        <p className="text-gray-700">{info.health}</p>
      </section>

      {/* Segregation */}
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-3">How to Segregate Safely</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          {info.segregation.map((point, idx) => (
            <li key={idx} className="flex items-center">
              <span className="mr-2 text-green-600"> </span>
              {point}
            </li>
          ))}
        </ul>
        <ul className="pl-6 mt-2">
          {info.dontInclude.map((point, idx) => (
            <li key={idx} className="flex items-center text-red-600">
              <span className="mr-2"> </span>
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Recycled Products */}
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-3">What It Gets Recycled Into</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {info.recycleInto.map((item, idx) => (
            <div key={idx} className="p-4 bg-green-50 rounded-lg text-center shadow hover:scale-105 transition">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Local Context */}
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-3">Recycling in India</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          {info.india.map((point, idx) => <li key={idx}>{point}</li>)}
        </ul>
      </section>

      {/* Interactive Quiz */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-3">Mini Quiz</h2>
        <p>{info.quiz.question}</p>
        <div className="flex gap-4 mt-2">
          {info.quiz.options.map(option => (
            <button
              key={option}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setQuizAnswer(
                option === info.quiz.correct ? `Correct! ${info.quiz.explanation}` : "Try again."
              )}
            >{option}</button>
          ))}
        </div>
        {quizAnswer && <p className="mt-2 text-green-700 font-semibold">{quizAnswer}</p>}
      </section>

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/plastic-types")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Plastic Types
        </button>
        <a
          href={info.wiki}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          Read More <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
}