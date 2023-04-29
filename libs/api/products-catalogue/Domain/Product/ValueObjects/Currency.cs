using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects
{
  public sealed class Currency : ValueObject
  {
    public CurrencyCode Code { get; }
    public string Symbol { get; }
    public static Currency USDollar => new(CurrencyCode.USD, "$");
    public static Currency CanadianDollar => new(CurrencyCode.CAD, "CDN$");
    public static Currency Euro => new(CurrencyCode.EUR, "€");

    public static Currency OfCode(CurrencyCode code)
    {
      return code switch
      {
        CurrencyCode.USD => new Currency(USDollar.Code, USDollar.Symbol),
        CurrencyCode.CAD => new Currency(CanadianDollar.Code, CanadianDollar.Symbol),
        CurrencyCode.EUR => new Currency(Euro.Code, Euro.Symbol),
        _ => throw new Exception($"Invalid code {code}")
      };
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Code;
      yield return Symbol;
    }

    private Currency(CurrencyCode code, string symbol)
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
