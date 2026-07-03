'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Pencil, Trash2 } from 'lucide-react';
import { Shell } from '@/components/ui/Shell';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductForm } from '@/components/products/ProductForm';
import { useProductsStore } from '@/stores/productsStore';
import { formatCents, formatDate } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const product = useProductsStore((state) => state.products.find((p) => p.id === params.id));
  const updateProduct = useProductsStore((state) => state.updateProduct);
  const removeProduct = useProductsStore((state) => state.removeProduct);
  const [editOpen, setEditOpen] = useState(false);

  if (!product) {
    return (
      <Shell title="Product not found">
        <Card>
          <CardBody className="pt-5">
            <EmptyState
              icon={FileText}
              title="This product no longer exists"
              description="It may have been deleted. Head back to the catalog."
              action={
                <Link href="/products">
                  <Button variant="outline" size="sm">
                    Back to products
                  </Button>
                </Link>
              }
            />
          </CardBody>
        </Card>
      </Shell>
    );
  }

  function handleDelete() {
    if (!product) return;
    if (window.confirm(`Delete ${product.name}? This cannot be undone.`)) {
      removeProduct(product.id);
      router.push('/products');
    }
  }

  return (
    <Shell
      title={product.name}
      description={`SKU ${product.sku}`}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      }
    >
      <Link href="/products" className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to products
      </Link>

      <Card>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Details</p>
          <Badge tone={product.stockQuantity > 0 ? 'success' : 'danger'}>
            {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
          </Badge>
        </CardHeader>
        <CardBody className="grid gap-4 pt-0 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs text-faint">Price</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-fg">{formatCents(product.priceCents)}</p>
          </div>
          <div>
            <p className="text-xs text-faint">SKU</p>
            <p className="mt-1 font-medium text-fg">{product.sku}</p>
          </div>
          <div>
            <p className="text-xs text-faint">Added</p>
            <p className="mt-1 font-medium text-fg">{formatDate(product.createdAt)}</p>
          </div>
          {product.description ? (
            <p className="col-span-full rounded-lg bg-surface-2 p-3 text-sm text-muted">{product.description}</p>
          ) : null}
        </CardBody>
      </Card>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit product">
        <ProductForm
          initialValues={product}
          submitLabel="Save changes"
          onSubmit={(input) => {
            updateProduct(product.id, input);
            setEditOpen(false);
          }}
        />
      </Modal>
    </Shell>
  );
}
