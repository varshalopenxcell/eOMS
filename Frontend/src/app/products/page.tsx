'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Plus, Search } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ProductForm } from '@/components/products/ProductForm';
import { useProductsStore } from '@/stores/productsStore';
import { formatCents } from '@/lib/utils';

type StockFilter = 'all' | 'in_stock' | 'out';

export default function ProductsPage() {
  const products = useProductsStore((state) => state.products);
  const addProduct = useProductsStore((state) => state.addProduct);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');

  const q = query.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesQuery = !q || product.name.toLowerCase().includes(q) || product.sku.toLowerCase().includes(q);
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'in_stock' && product.stockQuantity > 0) ||
      (stockFilter === 'out' && product.stockQuantity === 0);
    return matchesQuery && matchesStock;
  });

  return (
    <Shell
      title="Products"
      description="Manage your catalog, pricing, and inventory in one place."
      actions={
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Add product
        </Button>
      }
    >
      <Card>
        <CardBody className="pt-5">
          {products.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No products yet"
              description="Add products to start building your catalog, syncing inventory, and taking orders across channels."
              action={
                <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add your first product
                </Button>
              }
            />
          ) : (
            <>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by product name or SKU…"
                    className="w-full rounded-lg border border-line bg-field py-2 pl-9 pr-3 text-sm text-fg outline-none transition placeholder:text-faint focus:border-brand/60 focus:shadow-focus"
                  />
                </div>
                <select
                  value={stockFilter}
                  onChange={(event) => setStockFilter(event.target.value as StockFilter)}
                  className="rounded-lg border border-line bg-field px-3 py-2 text-sm text-fg outline-none transition focus:border-brand/60 sm:w-44"
                >
                  <option value="all">All stock</option>
                  <option value="in_stock">In stock</option>
                  <option value="out">Out of stock</option>
                </select>
              </div>

              <p className="mb-2 text-xs text-subtle">
                Showing {filtered.length} of {products.length} products
              </p>

              {filtered.length === 0 ? (
                <p className="rounded-lg border border-dashed border-line bg-surface-2 px-4 py-8 text-center text-sm text-muted">
                  No products match your filters.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                        <th className="pb-3 pr-4">Product</th>
                        <th className="pb-3 pr-4">SKU</th>
                        <th className="pb-3 pr-4">Price</th>
                        <th className="pb-3 pr-4">Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filtered.map((product) => (
                        <tr key={product.id}>
                          <td className="py-3 pr-4 font-medium text-fg">
                            <Link href={`/products/${product.id}`} className="hover:text-brand hover:underline">
                              {product.name}
                            </Link>
                          </td>
                          <td className="py-3 pr-4 text-muted">{product.sku}</td>
                          <td className="py-3 pr-4 tabular-nums text-muted">{formatCents(product.priceCents)}</td>
                          <td className="py-3 pr-4">
                            <Badge tone={product.stockQuantity > 0 ? 'success' : 'danger'}>
                              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add product" description="Add a new item to your catalog.">
        <ProductForm
          submitLabel="Add product"
          onSubmit={(input) => {
            addProduct(input);
            setModalOpen(false);
          }}
        />
      </Modal>
    </Shell>
  );
}
