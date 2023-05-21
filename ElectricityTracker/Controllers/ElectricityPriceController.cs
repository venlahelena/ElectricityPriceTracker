using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace ElectricityTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ElectricityPriceController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<ElectricityPriceController> _logger;

        public ElectricityPriceController(IHttpClientFactory httpClientFactory, ILogger<ElectricityPriceController> logger)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<PriceData>> Get()
        {
            var priceDataList = new List<PriceData>();

            var today = DateTime.Now.Date;
            var endDate = today.AddDays(-7);

            // Loop through each date starting from today and going back to the end date
            for (DateTime date = today; date >= endDate; date = date.AddDays(-1))
            {
                var dateString = date.ToString("yyyy-MM-dd");

                // Fetch and process price data for a specific date
                await FetchAndProcessPriceData(date, dateString, priceDataList);
            }

            // Convert the list of PriceData objects to an array and return it
            return priceDataList.ToArray();
        }

        private async Task FetchAndProcessPriceData(DateTime date, string dateString, List<PriceData> priceDataList)
        {
            // Loop through each hour of the day (0 to 23)
            for (int hour = 0; hour < 24; hour++)
            {
                // Construct the API URL for retrieving electricity price data for a specific date and hour
                var apiUrl = $"https://api.porssisahko.net/v1/price.json?date={dateString}&hour={hour}";

                var client = _httpClientFactory.CreateClient();
                var response = await client.GetAsync(apiUrl);
                response.EnsureSuccessStatusCode();
                var jsonResponse = await response.Content.ReadAsStringAsync();

                _logger.LogInformation("JSON Response: {JsonResponse}", jsonResponse);

                // Deserialize the JSON response into a dictionary
                var apiResponse = JsonSerializer.Deserialize<Dictionary<string, double>>(jsonResponse);

                // Check if the "price" key exists in the response and retrieve the price value
                if (apiResponse != null && apiResponse.TryGetValue("price", out double price))
                {
                    // Create a DateTime object representing the specific date and hour
                    var dateTime = new DateTime(date.Year, date.Month, date.Day, hour, 0, 0);

                    // Create a PriceData object with the DateTime and Price values
                    var priceData = new PriceData
                    {
                        DateTime = dateTime,
                        Price = price
                    };

                    // Add the PriceData object to the list
                    priceDataList.Add(priceData);
                }
            }
        }
    }
}