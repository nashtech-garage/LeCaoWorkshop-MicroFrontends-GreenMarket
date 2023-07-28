﻿// <auto-generated />
using Common.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Common.SqliteMigrations
{
    [DbContext(typeof(CommonDbContext))]
    partial class CommonDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.16");

            modelBuilder.Entity("Common.Data.Entities.BlogEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("comments_count")
                        .HasColumnType("TEXT");

                    b.Property<string>("created_by")
                        .HasColumnType("TEXT");

                    b.Property<string>("created_date")
                        .HasColumnType("TEXT");

                    b.Property<string>("description")
                        .HasColumnType("TEXT");

                    b.Property<string>("description_short")
                        .HasColumnType("TEXT");

                    b.Property<string>("images_url")
                        .HasColumnType("TEXT");

                    b.Property<string>("tags")
                        .HasColumnType("TEXT");

                    b.Property<string>("title")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("blogs");
                });

            modelBuilder.Entity("Common.Data.Entities.CategoryEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("image_url")
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("Common.Data.Entities.CouponEntity", b =>
                {
                    b.Property<string>("code")
                        .HasColumnType("TEXT");

                    b.Property<string>("description")
                        .HasColumnType("TEXT");

                    b.Property<string>("discount_amount")
                        .HasColumnType("TEXT");

                    b.Property<bool>("is_expired")
                        .HasColumnType("INTEGER");

                    b.Property<string>("unit")
                        .HasColumnType("TEXT");

                    b.HasKey("code");

                    b.ToTable("coupons");
                });

            modelBuilder.Entity("Common.Data.Entities.MainHeroBannerEntity", b =>
                {
                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<string>("CategoryName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageLink")
                        .HasColumnType("TEXT");

                    b.HasKey("Title");

                    b.ToTable("mainHeroBannerEntity");
                });

            modelBuilder.Entity("Common.Data.Entities.ProductEntity", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("availability")
                        .HasColumnType("INTEGER");

                    b.Property<int>("category_id")
                        .HasColumnType("INTEGER");

                    b.Property<string>("color")
                        .HasColumnType("TEXT");

                    b.Property<int>("count")
                        .HasColumnType("INTEGER");

                    b.Property<string>("description")
                        .HasColumnType("TEXT");

                    b.Property<string>("description_short")
                        .HasColumnType("TEXT");

                    b.Property<double>("discount")
                        .HasColumnType("REAL");

                    b.Property<string>("images_urls_string")
                        .HasColumnType("TEXT");

                    b.Property<string>("information")
                        .HasColumnType("TEXT");

                    b.Property<bool>("is_featured")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("is_latest")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("is_review")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("is_top_rate")
                        .HasColumnType("INTEGER");

                    b.Property<string>("main_image_url")
                        .HasColumnType("TEXT");

                    b.Property<string>("name")
                        .HasColumnType("TEXT");

                    b.Property<double>("price")
                        .HasColumnType("REAL");

                    b.Property<int>("review_count")
                        .HasColumnType("INTEGER");

                    b.Property<double>("weight")
                        .HasColumnType("REAL");

                    b.HasKey("id");

                    b.ToTable("products");
                });
#pragma warning restore 612, 618
        }
    }
}
