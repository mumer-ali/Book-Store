using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class Fourth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "URL",
                table: "Customer");

            migrationBuilder.RenameColumn(
                name: "URL",
                table: "Admin",
                newName: "PhoneNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Admin",
                newName: "URL");

            migrationBuilder.AddColumn<string>(
                name: "URL",
                table: "Customer",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
