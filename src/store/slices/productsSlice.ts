import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  material?: string;
  dimensions?: string;
  inStock: boolean;
  quantity: number;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    // In a real app, this would be an API call
    // For demo purposes, we'll return mock furniture data
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Modern Sofa',
        description: 'Elegant 3-seater sofa with premium fabric upholstery',
        price: 1299.99,
        image: '/images/modern-interior-composition-modular-sofa-260nw-2273970983.webp',
        category: 'Sofa',
        material: 'Premium Fabric, Solid Wood',
        dimensions: '220cm x 85cm x 70cm',
        inStock: true,
        quantity: 10
      },
      {
        id: 2,
        name: 'Dining Table Set',
        description: '6-seater dining table with matching chairs',
        price: 899.99,
        image: '/images/dining table.jpg',
        category: 'Table',
        material: 'Oak Wood',
        dimensions: '180cm x 90cm x 75cm',
        inStock: true,
        quantity: 8
      },
      {
        id: 3,
        name: 'King Size Bed',
        description: 'Luxurious king size bed with headboard',
        price: 1499.99,
        image: '/images/king bed.jpg',
        category: 'Bed',
        material: 'Engineered Wood, Fabric',
        dimensions: '200cm x 180cm x 120cm',
        inStock: true,
        quantity: 5
      },
      {
        id: 4,
        name: 'Study Desk',
        description: 'Modern study desk with storage compartments',
        price: 399.99,
        image: '/images/study desk.jpg',
        category: 'Desk',
        material: 'MDF with Oak Finish',
        dimensions: '120cm x 60cm x 75cm',
        inStock: true,
        quantity: 12
      },
      {
        id: 5,
        name: 'Coffee Table',
        description: 'Contemporary coffee table with glass top',
        price: 299.99,
        image: '/images/coffee table.jpg',
        category: 'Table',
        material: 'Glass, Metal',
        dimensions: '100cm x 60cm x 45cm',
        inStock: true,
        quantity: 15
      },
      {
        id: 6,
        name: 'Accent Chair',
        description: 'Stylish accent chair perfect for any room',
        price: 449.99,
        image: '/images/accent chair.png',
        category: 'Chair',
        material: 'Velvet, Metal',
        dimensions: '70cm x 65cm x 85cm',
        inStock: true,
        quantity: 20
      },
      {
        id: 7,
        name: 'Wardrobe',
        description: 'Spacious 3-door wardrobe with mirror',
        price: 899.99,
        image: '/images/Wardrobe.webp',
        category: 'Storage',
        material: 'Engineered Wood',
        dimensions: '150cm x 60cm x 200cm',
        inStock: true,
        quantity: 7
      },
      {
        id: 8,
        name: 'Bookshelf',
        description: 'Modern 5-tier bookshelf',
        price: 249.99,
        image: '/images/Bookshelf.webp',
        category: 'Storage',
        material: 'Metal, Wood',
        dimensions: '80cm x 30cm x 180cm',
        inStock: true,
        quantity: 10
      }
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    return mockProducts;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProductQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const product = state.items.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity = Math.max(0, action.payload.quantity);
        product.inStock = product.quantity > 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { updateProductQuantity } = productsSlice.actions;
export default productsSlice.reducer; 