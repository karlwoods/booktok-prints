"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SortOption = "price-low" | "price-high" | "name" | "top-sellers" | "newest";

export function SortOptions() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");

  useEffect(() => {
    const sort = searchParams.get("sort") as SortOption;
    if (sort) {
      setSelectedSort(sort);
    }
  }, [searchParams]);

  const handleSortChange = (sort: SortOption) => {
    setSelectedSort(sort);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="bg-main-light/50 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="text-sm bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main appearance-none min-w-[180px] bg-no-repeat bg-[length:12px_12px] bg-[center_right_12px] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236B7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M10%203a1%201%200%2001.707.293l3%203a1%201%200%2001-1.414%201.414L10%205.414%207.707%207.707a1%201%200%2001-1.414-1.414l3-3A1%201%200%200110%203zm-3.707%209.293a1%201%200%20011.414%200L10%2014.586l2.293-2.293a1%201%200%20011.414%201.414l-3%203a1%201%200%2001-1.414%200l-3-3a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
                <option value="top-sellers">Top Sellers</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 