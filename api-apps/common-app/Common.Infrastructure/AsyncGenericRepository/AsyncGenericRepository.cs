using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Common.Data;
using Microsoft.EntityFrameworkCore;

namespace Common.Infrastructure.AsyncGenericRepository
{
    public class AsyncGenericRepository<T> : IAsyncGenericRepository<T> where T : class
    {
        #region Fields

        protected CommonDbContext Context;

        #endregion

        public AsyncGenericRepository(CommonDbContext context)
        {
            Context = context;
        }

        #region Public Methods

        public Task<T> GetByIdAsync(int id)
            => Context.Set<T>().FindAsync(id).AsTask();

        public Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
            => Context.Set<T>().FirstOrDefaultAsync(predicate);

        public async Task AddAsync(T entity)
        {
            // await Context.AddAsync(entity);
            await Context.Set<T>().AddAsync(entity);
            await Context.SaveChangesAsync();
        }

        public Task UpdateAsync(T entity)
        {
            // In case AsNoTracking is used
            Context.Entry(entity).State = EntityState.Modified;
            return Context.SaveChangesAsync();
        }

        public Task RemoveAsync(T entity)
        {
            Context.Set<T>().Remove(entity);
            return Context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await Context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetWhereAsync(Expression<Func<T, bool>> predicate)
        {
            return await Context.Set<T>().Where(predicate).ToListAsync();
        }

        public Task<int> CountAllAsync() => Context.Set<T>().CountAsync();

        public Task<int> CountWhereAsync(Expression<Func<T, bool>> predicate)
            => Context.Set<T>().CountAsync(predicate);

        #endregion
    }
}