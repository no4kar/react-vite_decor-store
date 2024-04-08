import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/home.page';
import { Contacts } from './pages/contacts.page/contacts.page';
import { AboutUsPage } from './pages/about.us.page';
import { BasketPage } from './pages/basket.page';
import { GlobalProvider } from './store/GlobalContext';
import { FavoritePage } from './pages/favorite.page';
import { PlaceAnOrder } from './pages/place.an.order/place.an.order';
import { Cooperation } from './pages/cooperation-page';
import { NotFoundPage } from './pages/not-found-page';
import { DecorativeService } from './pages/decorative.service.page';
import { DetailsPage } from './pages/details.page';
import { WallpaperPage } from './pages/wallpaper.page';
import { HangWallpaper } from './pages/hang.wallpaper.page';
import { PaintTinting } from './pages/paint.tinting';
import { PaintPage } from './pages/paint.page';

export const Root = () => (
  <Router>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="cooperation" element={<Cooperation />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="about_us" element={<AboutUsPage />} />
          <Route path="service_decorative">
            <Route index element={<DecorativeService />} />
            <Route path=":id?" element={<DetailsPage />} />
          </Route>
          <Route path="service_hang_wallpaper">
            <Route index element={<HangWallpaper />} />
            <Route path=":id?" element={<DetailsPage />} />
          </Route>

          <Route path="paint_tinting" element={<PaintTinting />} />
          <Route path="wallpaper" element={<WallpaperPage />} />
          <Route path="paint" element={<PaintPage />} />

          <Route path="basket">
            <Route index element={<BasketPage />} />
            <Route path="place_an_order" element={<PlaceAnOrder />} />
          </Route>
          <Route path="favorite" element={<FavoritePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </GlobalProvider>
  </Router>
);
