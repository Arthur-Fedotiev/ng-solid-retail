using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects
{
  public sealed class Currency : ValueObject
  {
    public string Code { get; }
    public string Symbol { get; }
    public static Currency USDollar => new("USD", "$");
    public static Currency CanadianDollar => new("CAD", "CDN$");
    public static Currency Euro => new("EUR", "€");

    public static Currency OfCode(string code)
    {
      if (string.IsNullOrWhiteSpace(code))
      {
        // TODO: Use a custom exception type
        throw new Exception("Code cannot be null or whitespace.");
      }

      return code switch
      {
        "USD" => new Currency(USDollar.Code, USDollar.Symbol),
        "CAD" => new Currency(CanadianDollar.Code, CanadianDollar.Symbol),
        "EUR" => new Currency(Euro.Code, Euro.Symbol),
        _ => throw new Exception($"Invalid code {code}")
      };
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Code;
      yield return Symbol;
    }

    private Currency(string code, string symbol)
    {
      if (string.IsNullOrWhiteSpace(symbol))
      {
        throw new Exception("Symbol cannot be null or whitespace.");
      }

      Code = code;
      Symbol = symbol;
    }
  }
}