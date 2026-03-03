import { allProducts } from "@/data/product";
import { getCategoryColor, getCategoryIcon } from "@/lib/productUtils";

const restrictedApps = ["Scholar One", "Isla Intelligence", "Terra Vision AI"];

const AllApps = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-2">All Apps</h2>
      <p className="text-gray-600 mb-8">
        Access all your DAIA applications in one place
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((product, index) => {
          const needsAccess = restrictedApps.includes(product.name);

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getCategoryColor(
                  product.category,
                )} flex items-center justify-center text-white mb-4`}
              >
                {getCategoryIcon(product.category)}
              </div>

              <h4 className="text-lg font-bold mb-2">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-4">
                {product.description}
              </p>

              <button
                className={`w-full px-4 py-2 rounded-lg ${
                  needsAccess
                    ? "bg-gray-100 text-gray-700 border"
                    : "bg-blue-600 text-white"
                }`}
              >
                {needsAccess ? "Request Access" : "Launch App"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllApps;
