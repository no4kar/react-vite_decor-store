import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export const Root = () => (
  <Router
    basename={process.env.NODE_ENV === 'production'
      ? '/react-vite_decor-store/'
      : '/'}
  >
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="cooperation" element={<Cooperation />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="about_us" element={<AboutUsPage />} />
        <Route path="service_decorative">
          <Route index element={<DecorativeService />} />
          <Route path=":id?" element={<ServiceDetailsPage />} />
        </Route>
        <Route path="service_hang_wallpaper">
          <Route index element={<HangWallpaper />} />
          <Route path=":id?" element={<ServiceDetailsPage />} />
        </Route>

        {/* <Route path="paint_tinting" element={<PaintTinting />} /> */}
        <Route path="wallpaper">
          <Route index element={<WallpaperPage />} />
          <Route path=":id?" element={<ProductDetailsPage />} />
        </Route>
        <Route path="paint">
          <Route index element={<PaintPage />} />
          <Route path=":id?" element={<ProductDetailsPage />} />
        </Route>

        <Route path="basket">
          <Route index element={<BasketPage />} />
          <Route path="place_an_order" element={<PlaceAnOrder />} />
        </Route>
        <Route path="favorite" element={<FavoritePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
