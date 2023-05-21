namespace ElectricityTracker.Models
{
    public class ElectricityPrice
    {
        public DateTime DateTime { get; set; }
        public decimal Value { get; set; }
    }

    public class PriceExtremes
    {
        public DateTime? CheapestDay { get; set; }
        public DateTime? MostExpensiveDay { get; set; }
    }
}
