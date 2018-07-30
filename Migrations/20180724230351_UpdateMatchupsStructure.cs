using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicMatchupv2.Migrations
{
    public partial class UpdateMatchupsStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matchups_Artists_ArtistId",
                table: "Matchups");

            migrationBuilder.DropForeignKey(
                name: "FK_Matchups_Bands_BandId",
                table: "Matchups");

            migrationBuilder.DropIndex(
                name: "IX_Matchups_ArtistId",
                table: "Matchups");

            migrationBuilder.DropIndex(
                name: "IX_Matchups_BandId",
                table: "Matchups");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Matchups_ArtistId",
                table: "Matchups",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_Matchups_BandId",
                table: "Matchups",
                column: "BandId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matchups_Artists_ArtistId",
                table: "Matchups",
                column: "ArtistId",
                principalTable: "Artists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Matchups_Bands_BandId",
                table: "Matchups",
                column: "BandId",
                principalTable: "Bands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
