import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/home.page';
import { Contacts } from './pages/contacts.page/contacts.page';
import { AboutUsPage } from './pages/about.us.page';
import { BasketPage } from './pages/basket.page';
import { FavoritePage } from './pages/favorite.page';
import { PlaceAnOrder } from './pages/place.an.order/place.an.order';
import { Cooperation } from './pages/cooperation-page';
import { NotFoundPage } from './pages/not-found-page';
import { DecorativeService } from './pages/decorative.service.page';
import { ServiceDetailsPage } from './pages/serviceDetails.page';
import { WallpaperPage } from './pages/wallpaper.page';
import { HangWallpaper } from './pages/hang.wallpaper.page';
import { PaintPage } from './pages/paint.page';
import { ProductDetailsPage } from './pages/productDetails.page';
import { LoginPage } from './pages/login.page/login.page';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { AdminPage } from './pages/admin.page/admin.page';
import { ProductsTable } from './components/ProductsTable';
import { ServicesTable } from './components/ServicesTable';
import { ProductEdit } from './components/ProductForm/ProductEdit';
import { ProductCreate } from './components/ProductForm/ProductCreate';
import { ServiceEdit } from './components/ServiceForm/ServiceEdit';
import { ServiceCreate } from './components/ServiceForm/ServiceCreate';
import { OrdersTable } from './components/OrdersTable';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cooperation', element: <Cooperation /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'about_us', element: <AboutUsPage /> },
      {
        path: 'service_decorative',
        children: [
          { index: true, element: <DecorativeService /> },
          { path: ':id', element: <ServiceDetailsPage /> },
        ],
      },
      {
        path: 'service_hang_wallpaper',
        children: [
          { index: true, element: <HangWallpaper /> },
          { path: ':id', element: <ServiceDetailsPage /> },
        ],
      },
      {
        path: 'wallpaper',
        children: [
          { index: true, element: <WallpaperPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
        ],
      },
      {
        path: 'paint',
        children: [
          { index: true, element: <PaintPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
        ],
      },
      {
        path: 'basket',
        children: [
          { index: true, element: <BasketPage /> },
          { path: 'place_an_order', element: <PlaceAnOrder /> },
        ],
      },
      { path: 'favorite', element: <FavoritePage /> },
      { path: 'login', element: <LoginPage /> },
      {
        path: '/',
        element: <RequireAuth />,
        children: [
          {
            path: 'admin',
            element: <AdminPage />,
            children: [
              {
                path: 'products',
                children: [
                  { index: true, element: <ProductsTable /> },
                  { path: ':id', element: <ProductEdit /> },
                  { path: 'new', element: <ProductCreate /> },
                ],
              },
              {
                path: 'services',
                children: [
                  { index: true, element: <ServicesTable /> },
                  { path: ':id', element: <ServiceEdit /> },
                  { path: 'new', element: <ServiceCreate /> },
                ],
              },
              {
                path: 'orders',
                children: [
                  { index: true, element: <OrdersTable /> },
                  // { path: ':id', element: <ServiceEdit /> },
                  // { path: 'new', element: <ServiceCreate /> },
                ],
              },
            ]
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], {
  basename: '/react-vite_decor-store/',
});

export const Root = () => (
  <RouterProvider router={router} />
);
