"use client";

import { useState, useEffect } from "react";
import { Product, ProductReview } from "@/types/product";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type ReviewsManagerProps = {
  product: Product;
  onUpdate: () => Promise<void>;
  isReadOnly?: boolean;
};

export default function ReviewsManager({
  product,
  onUpdate,
  isReadOnly = false,
}: ReviewsManagerProps) {
  const [reviews, setReviews] = useState<ProductReview[]>(
    product.product_reviews || []
  );

  useEffect(() => {
    setReviews(product.product_reviews || []);
  }, [product.product_reviews]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleEdit = (item: ProductReview & { id?: string }) => {
    setEditingId(item.id || "new");
    setFormData({
      rating: item.rating,
      title: item.title,
      comment: item.comment,
      author: item.author,
      date: item.date
        ? item.date.split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      rating: 5,
      title: "",
      comment: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { date, ...reviewData } = formData;
      const dataToSave = {
        ...reviewData,
        created_at: date
          ? new Date(date).toISOString()
          : new Date().toISOString(),
      };

      if (editingId && editingId !== "new") {
        const { error } = await supabase
          .from("product_reviews")
          .update(dataToSave)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("product_reviews").insert({
          product_id: product.id,
          ...dataToSave,
        });

        if (error) throw error;
      }

      await onUpdate();
      handleCancel();
      toast.success(
        editingId && editingId !== "new"
          ? "Review updated successfully"
          : "Review added successfully"
      );
    } catch (error) {
      toast.error("Failed to save review");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("product_reviews")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await onUpdate();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete review");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl  text-white">Reviews Management</h3>
        {!showAddForm && !isReadOnly && (
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingId("new");
              setFormData({
                rating: 5,
                title: "",
                comment: "",
                author: "",
                date: new Date().toISOString().split("T")[0],
              });
            }}
            className="px-4 py-2 bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white rounded-full text-xs uppercase tracking-wider transition-colors"
          >
            Add Review
          </button>
        )}
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="glass-panel p-6 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="space-y-6 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="author"
                  className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
                  placeholder="Emre G."
                />
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
                >
                  Rating
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none appearance-none bg-black/30"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option
                      key={r}
                      value={r}
                      className="bg-neutral-900 text-white"
                    >
                      {r} Star{r !== 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none"
                placeholder="My go-to protein powder!"
              />
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
              >
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none resize-none"
                placeholder="I've been using this protein powder for a few months now..."
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg glass-input focus:outline-none scheme-dark"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-lg text-xs uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-obsidian-lighter text-black font-semibold uppercase tracking-wider text-xs rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50"
            >
              {isLoading
                ? "Saving..."
                : editingId === "new"
                ? "Add Review"
                : "Update Review"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {reviews.length === 0 ? (
          <p className="text-white/30 text-center py-8 text-sm uppercase tracking-widest ">
            No reviews found
          </p>
        ) : (
          reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 glass-panel rounded-xl group hover:border-obsidian-lighter/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium text-white text-sm tracking-wide">
                      {review.author}
                    </span>
                    <span className="text-white/20 text-xs">•</span>
                    <span className="text-xs text-white/50">{review.date}</span>
                    <span className="text-white/20 text-xs">•</span>
                    <span className="text-yellow-500 tracking-widest text-xs">
                      {"★".repeat(review.rating)}
                    </span>
                  </div>
                  <h4 className=" text-white text-lg mb-2">{review.title}</h4>
                  <p className="text-white/60 text-sm  leading-relaxed">
                    {review.comment}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {!isReadOnly && (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(review as ProductReview & { id: string })
                        }
                        className="p-2 hover:bg-white/10 rounded-md transition-colors text-white/70"
                        title="Edit"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                      {"id" in review && typeof review.id === "string" && (
                        <button
                          onClick={() => handleDelete(review.id as string)}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                          title="Delete"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
