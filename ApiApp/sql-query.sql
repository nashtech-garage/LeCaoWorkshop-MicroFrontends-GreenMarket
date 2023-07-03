
CREATE TABLE categories (
    id INT PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (255) NOT NULL,
    image_url NVARCHAR (1023),

    created_by NVARCHAR(255) NOT NULL,
    created_date DATETIME default GETDATE(),
    modified_by NVARCHAR(255),
    modified_date DATETIME
);

CREATE TABLE products (
    id INT PRIMARY KEY IDENTITY (1, 1),
    name NVARCHAR (255) NOT NULL,
    price FLOAT,
    weight FLOAT,
    description_short TEXT,
    description TEXT,
    information TEXT,
    color NVARCHAR(255),
    discount INT,
    availability BIT DEFAULT 0,
    main_image_url NVARCHAR(1023),
    images_urls TEXT,
    is_featured BIT DEFAULT 0,
    count INT,
    is_latest BIT DEFAULT 0,
    review_count INT,

    created_by NVARCHAR(255) NOT NULL,
    created_date DATETIME default GETDATE(),
    modified_by NVARCHAR(255),
    modified_date DATETIME,

    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE blog (
    id INT PRIMARY KEY IDENTITY (1, 1),
    title NVARCHAR (255) NOT NULL,
    images_url NVARCHAR(1023),
    description TEXT,
    description_short TEXT,
    tags NVARCHAR(255),
    comments_count INT,

    created_by NVARCHAR(255) NOT NULL,
    created_date DATETIME default GETDATE(),
    modified_by NVARCHAR(255),
    modified_date DATETIME
);

CREATE TABLE main_hero_banner (
    id INT PRIMARY KEY IDENTITY (1, 1),
    category_name NVARCHAR (255) NOT NULL,
    title NVARCHAR(255),
    content TEXT,
    image_link NVARCHAR(1023),

    created_by NVARCHAR(255) NOT NULL,
    created_date DATETIME default GETDATE(),
    modified_by NVARCHAR(255),
    modified_date DATETIME
);

CREATE TABLE coupon (
    id INT PRIMARY KEY IDENTITY (1, 1),
    code NVARCHAR (255) NOT NULL,
    description TEXT,
    discount_amount INT,
    unit NVARCHAR (255),
    is_expired BIT DEFAULT 0,

    created_by NVARCHAR(255) NOT NULL,
    created_date DATETIME default GETDATE(),
    modified_by NVARCHAR(255),
    modified_date DATETIME
);


/*INSERT VALUES*/
INSERT INTO [dbo].[categories] ([name] ,[image_url] ,[created_by])
VALUES 
('Fresh Meat', 'img/categories/cat-1.jpg', 'Phuc Hoang'),
('Vegetables', 'img/categories/cat-2.jpg', 'Phuc Hoang'),
('Fruit & Nut Gifts', 'img/categories/cat-3.jpg', 'Phuc Hoang'),
('Fresh Berries', 'img/categories/cat-4.jpg', 'Phuc Hoang'),
('Ocean Foods', 'img/categories/cat-5.jpg', 'Phuc Hoang'),
('Butter & Eggs', 'img/categories/cat-6.jpg', 'Phuc Hoang'),
('Fastfood', 'img/categories/cat-7.jpg', 'Phuc Hoang');

INSERT INTO [dbo].[products]
           ([name],[price],[weight],[description_short],[description],[information],[color],[discount],[availability],[main_image_url],[images_urls],[is_featured],[count],[is_latest],[review_count],[created_by],[category_id])
     VALUES
           ('Vetgetable’s Package', 100.0, 200.0
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 20, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 20, 1, 10, 'Phuc Hoang', 8),

		   ('Vetgetable’s Package', 32.0, 1.5
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 15, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 21, 1, 2, 'Phuc Hoang', 8),

			('Vetgetable’s Package', 223.0, 223.0
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 15, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 20, 0, 123, 'Phuc Hoang', 8),

		   ('Vetgetable’s Package', 223.0, 223.0
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 15, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 20, 0, 123, 'Phuc Hoang', 8),

		   ('Vetgetable’s Package', 223.0, 223.0
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 15, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 20, 0, 123, 'Phuc Hoang', 12),

		   ('Vetgetable’s Package', 223.0, 223.0
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 15, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 20, 0, 123, 'Phuc Hoang', 11),

		   ('Vetgetable’s Package', 223.0, 223.0
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 15, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 20, 0, 123, 'Phuc Hoang', 9),

		   ('Vetgetable’s Package', 223.0, 223.0
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 15, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 20, 0, 123, 'Phuc Hoang', 10),

		   ('Vetgetable’s Package', 223.0, 223.0
           ,'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.'
           ,'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
           ,'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
		   ,'Green', 15, 1
           ,'img/product/product-1.jpg'
           ,'[
			  "img/product/details/product-details-1.jpg",
			  "img/product/details/product-details-2.jpg",
			  "img/product/details/product-details-3.jpg",
			  "img/product/details/product-details-4.jpg",
			  "img/product/details/product-details-5.jpg"
			]'
           ,1, 20, 0, 123, 'Phuc Hoang', 10);

INSERT INTO [dbo].[blog]
           ([title]
           ,[images_url]
           ,[description]
           ,[description_short]
           ,[tags]
           ,[comments_count]
           ,[created_by])
     VALUES
           ('Cooking tips make cooking simple','img/blog/blog-1.jpg'
           ,'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
           ,'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.'
           ,'All, Trending, Cooking, Healthy Food, Life Style' ,5, 'Phuc Hoang'),

		   ('6 ways to prepare breakfast for 30','img/blog/blog-2.jpg'
           ,'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
           ,'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.'
           ,'All, Trending, Cooking, Healthy Food, Life Style' ,8, 'Phuc Hoang'),

		   ('Visit the clean farm in the US','img/blog/blog-3.jpg'
           ,'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
           ,'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.'
           ,'All, Trending, Cooking, Healthy Food, Life Style' ,15, 'Phuc Hoang'),

		   ('The Moment You Need To Remove Garlic From The Menu','img/blog/blog-4.jpg'
           ,'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
           ,'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.'
           ,'All, Trending, Cooking, Healthy Food, Life Style' ,2, 'Phuc Hoang'),

		   ('Cooking tips make cooking simple','img/blog/blog-5.jpg'
           ,'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
           ,'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.'
           ,'All, Trending, Cooking, Healthy Food, Life Style' ,22, 'Phuc Hoang'),

		   ('Cooking tips make cooking simple','img/blog/blog-6.jpg'
           ,'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat'
           ,'Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.'
           ,'All, Trending, Cooking, Healthy Food, Life Style' ,12, 'Phuc Hoang');


INSERT INTO [dbo].[coupon]
           ([code],[description],[discount_amount] ,[unit] ,[is_expired] ,[created_by])
     VALUES
           ('FREE10' , '10% discount', 10 , 'percentage', 0 ,'Phuc Hoang'),
		   ('FREE20' , '20% discount', 20 , 'percentage', 0 ,'Phuc Hoang');

INSERT INTO [dbo].[main_hero_banner]
           ([category_name], [title], [content], [image_link], [created_by])
     VALUES
           ('FRUIT FRESH', 'Vegetable 100% Organic', 'Free Pickup and Delivery Available', 'img/hero/banner.jpg' ,'Phuc Hoang');