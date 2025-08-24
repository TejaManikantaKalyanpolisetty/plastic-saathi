import React from "react";

export default function SegregationTips() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Intro */}
      <h1 className="text-3xl font-bold text-green-700 mb-3">Segregation Tips</h1>
      <p className="text-gray-700 mb-2">
        Proper plastic segregation is the first step toward effective recycling and reducing pollution.
        Follow these guidelines to ensure plastics are disposed of correctly.
      </p>

      {/* General Guidelines */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-2">General Guidelines</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>✅ Rinse containers thoroughly to remove food/liquid residues.</li>
          <li>✅ Remove caps and lids (often different plastics).</li>
          <li>✅ Check recycling symbols (♻ #1–#7) to identify plastic types.</li>
          <li>✅ Separate plastics by type (e.g., PET bottles separate from LDPE bags).</li>
          <li>✅ Flatten bottles/containers to save space.</li>
          <li>✅ Keep plastics clean and dry.</li>
        </ul>
      </section>

      {/* Avoid Mistakes */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-2">Avoid These Mistakes</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li className="text-red-600">❌ Mixing different plastic types in one bag.</li>
          <li className="text-red-600">❌ Throwing in contaminated or dirty plastics.</li>
          <li className="text-red-600">❌ Burning plastics (releases toxic fumes).</li>
          <li className="text-red-600">❌ Including laminated or multi-layered non-recyclable plastics.</li>
        </ul>
      </section>

      {/* Type-Specific Instructions */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-2">Type-Specific Instructions</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li><strong>PET (#1):</strong> Rinse bottles, remove caps, crush flat.</li>
          <li><strong>HDPE (#2):</strong> Clean detergent/milk bottles, remove labels.</li>
          <li><strong>PVC (#3):</strong> Take to specific collection points.</li>
          <li><strong>LDPE (#4):</strong> Keep grocery bags separate; recycle at store bins.</li>
          <li><strong>PP (#5):</strong> Rinse food containers and dry thoroughly.</li>
          <li><strong>PS (#6):</strong> Rarely recycled; avoid or reuse when possible.</li>
          <li><strong>Other (#7):</strong> Check local recycling rules.</li>
        </ul>
      </section>

      {/* Safe Storage */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-2">Safe Storage</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Use separate bins labeled for each plastic type.</li>
          <li>Keep plastics away from sunlight and odors.</li>
        </ul>
      </section>

      {/* India-Specific Tips */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-2">India-Specific Tips</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Use city-run segregated waste collection services.</li>
          <li>Join local recycling drives and drop-off points.</li>
          <li>Support initiatives like Swachh Bharat Abhiyan.</li>
        </ul>
      </section>

      {/* Reduce & Reuse */}
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-2">Reduce &amp; Reuse</h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Carry reusable bottles and cloth bags.</li>
          <li>Use glass or steel containers.</li>
          <li>Reuse plastic containers for storage when safe.</li>
        </ul>
      </section>
    </div>
  );
}
