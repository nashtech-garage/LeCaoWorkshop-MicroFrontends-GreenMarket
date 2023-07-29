using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Common.SqlServerMigrations
{
    public partial class InitialSqlServerMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "blogs",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    images_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description_short = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_by = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_date = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tags = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    comments_count = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_blogs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image_url = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "coupons",
                columns: table => new
                {
                    code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    discount_amount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_expired = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_coupons", x => x.code);
                });

            migrationBuilder.CreateTable(
                name: "mainHeroBannerEntity",
                columns: table => new
                {
                    Title = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageLink = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mainHeroBannerEntity", x => x.Title);
                });

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<double>(type: "float", nullable: false),
                    category_id = table.Column<int>(type: "int", nullable: false),
                    weight = table.Column<double>(type: "float", nullable: false),
                    description_short = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    information = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    discount = table.Column<double>(type: "float", nullable: false),
                    availability = table.Column<bool>(type: "bit", nullable: false),
                    main_image_url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    images_urls_string = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    is_featured = table.Column<bool>(type: "bit", nullable: false),
                    count = table.Column<int>(type: "int", nullable: false),
                    is_latest = table.Column<bool>(type: "bit", nullable: false),
                    review_count = table.Column<int>(type: "int", nullable: false),
                    is_review = table.Column<bool>(type: "bit", nullable: false),
                    is_top_rate = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "blogs");

            migrationBuilder.DropTable(
                name: "categories");

            migrationBuilder.DropTable(
                name: "coupons");

            migrationBuilder.DropTable(
                name: "mainHeroBannerEntity");

            migrationBuilder.DropTable(
                name: "products");
        }
    }
}
