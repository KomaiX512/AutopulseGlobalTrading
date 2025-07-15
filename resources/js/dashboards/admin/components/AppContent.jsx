import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import routes from '../routes'
import ProductForm from '../views/products/ProductForm';
import ProductIndex from '../views/products/ProductIndex';
import { Products } from '../views/products/Products'
import OrderDetailsPage from '../views/orders/OrderDetailsPage';
import CategoryIndex from '../views/categories';
import { Categories } from '../views/categories/Categories';
import CategoriesForm from '../views/categories/CategoriesForm';
import UpdateProfileInformation from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import { Brands } from '../views/brands/Brands';
import BrandIndex from '../views/brands/BrandIndex';
import BrandForm from '../views/brands/BrandForm';
import SparePartsIndex from '../views/spare_parts/SparePartsIndex';
import { SpareParts } from '../views/spare_parts/SpareParts';
import SparePartsForm from '../views/spare_parts/SparePartsForm';
import SolutionsIndex from '../views/solutions/SolutionsIndex';
import { Solutions } from '../views/solutions/Solutions';
import SolutionForm from '../views/solutions/SolutionForm';
import SolutionProductsManager from '../views/solutions/SolutionProductsManager';

const AppContent = () => {
  return (
    <div id='dash-root-responsive' className="dash-root-responsive px-5" style={{ position: 'relative' }}>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes?.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}

          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="/transactions" element={<Navigate to="transactions" replace />} />
          <Route path="/orders" element={<Navigate to="dashboard" replace />} />

          <Route path='/machinery-vehicles' element={<ProductIndex />}>
            <Route path="list" element={<Products />} />
            <Route path="form/:id?" element={<ProductForm />} />
            <Route path="details/:id?" element={<ProductForm />} />
          </Route>


          <Route path='/spare-parts' element={<SparePartsIndex />}>
            <Route path="list" element={<SpareParts />} />
            <Route path="form/:id?" element={<SparePartsForm />} />
            <Route path="details/:id?" element={<SparePartsForm />} />
          </Route>

          <Route path='/categories' element={<CategoryIndex />}>
            <Route path="list" element={<Categories />} />
            <Route path="form/:id?" element={<CategoriesForm />} />
            <Route path="details/:id?" element={<CategoriesForm />} />
          </Route>

          <Route path='/brands' element={<BrandIndex />}>
            <Route path="list" element={<Brands />} />
            <Route path="form/:id?" element={<BrandForm />} />
          </Route>

          <Route path='/customers/order/:id' element={<OrderDetailsPage />} />

          <Route path='/solutions' element={<SolutionsIndex />}>
            <Route path="list" element={<Solutions />} />
            <Route path="form/:id?" element={<SolutionForm />} />
            <Route path="products/:id" element={<SolutionProductsManager />} />
          </Route>
          <Route path='/profile/update' element={<UpdateProfileInformation />} />


        </Routes>


      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
