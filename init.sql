-- Creación de tablas
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    sizes VARCHAR(255) NOT NULL,
    details TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    size INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shipping_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserción de datos iniciales


INSERT INTO products (name, description, price, stock, sizes, details, image_url) VALUES
('Pascal Wanama Mujer', 'Botas Dr Martens 1460 Pascal Wanama Mujer Negras | QUCV-14508', 233.22, 100,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.','https://www.drmartensencolombia.com.co/images/doctormartenscolombia/Botas_Dr_Martens_1460_Pascal_Wanama_Muje-QUCV-14508.jpg'),
('Martens Molly Mujer Negras', 'Botas Plataforma Dr Martens Molly Mujer Negras | QRGY-94172', 375.53, 50,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Molly_Mujer_-QRGY-94172_ZOOM.jpg'),
('Martens Jadon Polka Dot', 'Botas Plataforma Dr Martens Jadon Polka Dot Smooth Mujer Blancas | LHKF-30296', 376.43, 100,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Jadon_Polka_-LHKF-30296_ZOOM.jpg'),
('Martens Sinclair Mujer', 'Botas Plataforma Dr Martens Sinclair Mujer Blancas | POZH-63589', 377.32, 50,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Sinclair_Muj-POZH-63589_ZOOM.jpg'),
('Devon Heart Mujer', 'Botas Plataforma Dr Martens Devon Heart Mujer Rosas | QHOR-80431', 375.53, 100,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Devon_Heart_-QHOR-80431_ZOOM.jpg'),
('Martens Molly hombre Negras', 'Botas Plataforma Dr Martens Molly Mujer Negras | QRGY-94172', 375.53, 50,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Molly_Mujer_-QRGY-94172_ZOOM.jpg'),
('Martens Leona Faux Fur', 'Botas Plataforma Dr Martens Leona Faux Fur Plataforma Mujer Negras | BFXR-79168', 375.57, 100,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Leona_Faux_F-BFXR-79168_ZOOM.jpg'),
('Martens Jadon Charol', 'Botas Plataforma Dr Martens Jadon Charol Mujer Negras | WMKP-19463', 374.67, 50,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Jadon_Charol-WMKP-19463_ZOOM.jpg'),
('Martens Vegan Jadon II', 'Botas Plataforma Dr Martens Vegan Jadon II Plataforma Mujer Rosas Rojas | ZNCQ-52840', 456.67, 100,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Vegan_Jadon_-ZNCQ-52840_ZOOM.jpg'),
('Martens Jadon Max Mujer', 'Botas Plataforma Dr Martens Jadon Max Mujer Burdeos | MTJU-37402', 377.32, 50,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_Jadon_Max_Mu-MTJU-37402_ZOOM.jpg'),
('Martens 1460 Bex ', 'Botas Plataforma Dr Martens 1460 Bex Smooth Mujer Blancas | WSXP-21780', 374.78, 200,'36,37,38,39,40,41,42','Cuero 100%. Suela de goma con amortiguacion. Limpiar con pano humedo. Hecho en Inglaterra.', 'https://www.drmartensencolombia.com.co/images/large/doctormartenscolombia/Botas_Plataforma_Dr_Martens_1460_Bex_Smo-WSXP-21780_ZOOM.jpg');

INSERT INTO shipping_options (name, price) VALUES
('Standard Shipping', 30.34),
('Express Shipping', 15.00);
